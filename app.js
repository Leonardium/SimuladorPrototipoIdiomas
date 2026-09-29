/* =====================================================================
   Simulador de Comprensión Lectora · Idiomas UVM
   App de una sola página: Firebase Auth (Google) + Cloud Firestore.
   ---------------------------------------------------------------------
   Colecciones:
     roles/{correo}        {rol:'profesor'|'admin', nombre}
     alumnos/{uid}         {nombre, correo, grupo, creado}
     config/general        {grupos:[...]}
     lecturas/{id}         {titulo, seccion, academia, fuente, minutos, numerar,
                            parrafos[], preguntas[{enunciado, opciones[], habilidad}],
                            activa, mostrarResultados, orden, actualizado}
     claves/{id}           {correctas[], justificaciones[]}
     intentos/{id__uid}    {uid, lecturaId, correo, nombre, grupo, estado, inicio, fin,
                            respuestas[], cambiosPestana, minutos, totalPreguntas}
   ===================================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
  onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, collection, query, where,
  serverTimestamp, writeBatch
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig, DOMINIO_ALUMNOS, ADMINS, AUTOR } from "./config.js";

const fbApp = initializeApp(firebaseConfig);
const auth = getAuth(fbApp);
const db = getFirestore(fbApp);

/* ===================================================================
   UTILIDADES
   =================================================================== */
const $ = s => document.querySelector(s);
const main = $("#main");
const LETRAS = ["A", "B", "C", "D", "E"];
const ROMANOS = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"];
const TOLERANCIA_MS = 120 * 1000; // igual que TOLERANCIA_SEG en firestore.rules

const esc = v => String(v ?? "").replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const minus = s => String(s || "").trim().toLowerCase();
const matricula = correo => String(correo || "").split("@")[0];
const iniciales = nombre => String(nombre || "?").trim().split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase();
const ms = t => t ? (t.toMillis ? t.toMillis() : +t) : null;
const fecha = t => t ? new Date(ms(t)).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" }) : "—";
const fechaCSV = t => {
  if (!t) return "";
  const d = new Date(ms(t)), z = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())} ${z(d.getHours())}:${z(d.getMinutes())}`;
};
const idIntento = (lecturaId, uid) => `${lecturaId}__${uid}`;
const slug = s => String(s || "lectura").normalize("NFD").replace(/[̀-ͯ]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "lectura";

function toast(msg, ms = 2600) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.remove("oculto");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.add("oculto"), ms);
}

/* Modal propio (en vez de alert/confirm del navegador) */
function dialogo({ titulo, cuerpo = "", botones }) {
  return new Promise(resolve => {
    $("#modal-titulo").textContent = titulo;
    $("#modal-cuerpo").textContent = cuerpo;
    const cont = $("#modal-acciones");
    cont.innerHTML = "";
    botones.forEach(b => {
      const el = document.createElement("button");
      el.className = "btn " + (b.clase || "btn-suave");
      el.textContent = b.texto;
      el.addEventListener("click", () => { $("#modal").classList.add("oculto"); resolve(b.valor); });
      cont.appendChild(el);
    });
    $("#modal").classList.remove("oculto");
    cont.lastChild?.focus();
  });
}
const confirmar = (titulo, cuerpo, si = "Aceptar", clase = "btn-rojo") =>
  dialogo({ titulo, cuerpo, botones: [{ texto: "Cancelar", valor: false }, { texto: si, valor: true, clase }] });
const avisar = (titulo, cuerpo) => dialogo({ titulo, cuerpo, botones: [{ texto: "Entendido", valor: true, clase: "btn-rojo" }] });

function mensajeError(e) {
  const code = e?.code || "";
  if (code.includes("permission-denied")) return "No tienes permiso para esta acción (reglas de Firestore).";
  if (code.includes("unavailable")) return "Sin conexión con el servidor. Revisa tu internet e inténtalo de nuevo.";
  return e?.message || String(e);
}
async function conError(fn) {
  // Devuelve el resultado de fn (o true si fn no devuelve nada); undefined si hubo error
  try { const r = await fn(); return r === undefined ? true : r; }
  catch (e) { console.error(e); await avisar("Algo salió mal", mensajeError(e)); return undefined; }
}

function cargandoEn(el, texto = "Cargando…") {
  el.innerHTML = `<div class="vacio"><div class="spinner"></div>${esc(texto)}</div>`;
}

/* ===================================================================
   ESTADO
   =================================================================== */
const estado = {
  user: null,
  rol: null,            // 'alumno' | 'profesor' | 'admin'
  perfil: null,         // alumnos/{uid}
  vista: null,
  examen: null,
  config: { grupos: [] },
  cacheLecturas: null,  // staff
};
let timerId = null;
let autosaveId = null;

/* ===================================================================
   AUTENTICACIÓN
   =================================================================== */
$("#login-autor").textContent = AUTOR;

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

$("#btn-google").addEventListener("click", async () => {
  $("#login-error").classList.add("oculto");
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    if (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment") {
      await signInWithRedirect(auth, provider);
    } else if (e.code !== "auth/popup-closed-by-user" && e.code !== "auth/cancelled-popup-request") {
      errorLogin(e.code === "auth/unauthorized-domain"
        ? "Este dominio no está autorizado en Firebase (Authentication → Configuración → Dominios autorizados)."
        : mensajeError(e));
    }
  }
});
getRedirectResult(auth).catch(e => errorLogin(mensajeError(e)));

function errorLogin(msg) {
  const el = $("#login-error");
  el.innerHTML = msg;
  el.classList.remove("oculto");
}

$("#btn-salir").addEventListener("click", async () => {
  if (estado.vista === "examen" && estado.examen && !estado.examen.preview) {
    const ok = await confirmar("¿Cerrar sesión?", "Tu intento queda guardado y el tiempo sigue corriendo. Podrás continuarlo al volver a entrar.", "Cerrar sesión");
    if (!ok) return;
    await guardarAhora();
  }
  detenerReloj();
  await signOut(auth);
});

function mostrar(id) {
  ["#vista-cargando", "#vista-login", "#app"].forEach(s => $(s).classList.toggle("oculto", s !== id));
}

onAuthStateChanged(auth, async user => {
  detenerReloj();
  $("#toast").classList.add("oculto");
  estado.user = user; estado.rol = null; estado.perfil = null; estado.examen = null; estado.cacheLecturas = null;
  if (!user) { mostrar("#vista-login"); return; }
  mostrar("#vista-cargando");
  try {
    const correo = minus(user.email);
    let rol = null;
    if (ADMINS.map(minus).includes(correo)) rol = "admin";
    else {
      const r = await getDoc(doc(db, "roles", correo));
      if (r.exists()) rol = r.data().rol === "admin" ? "admin" : "profesor";
      else if (correo.split("@")[1] === minus(DOMINIO_ALUMNOS)) rol = "alumno";
    }
    if (!rol) {
      await signOut(auth);
      mostrar("#vista-login");
      errorLogin(`La cuenta <b>${esc(correo)}</b> no tiene acceso. Entra con tu correo institucional (@${esc(DOMINIO_ALUMNOS)}).`);
      return;
    }
    estado.rol = rol;
    const cfg = await getDoc(doc(db, "config", "general"));
    estado.config = cfg.exists() ? { grupos: [], ...cfg.data() } : { grupos: [] };

    pintarBarra();
    mostrar("#app");

    if (rol === "alumno") {
      const p = await getDoc(doc(db, "alumnos", user.uid));
      if (p.exists()) { estado.perfil = p.data(); navegar("dashboard"); }
      else navegar("perfil");
    } else {
      navegar("staff-lecturas");
    }
  } catch (e) {
    console.error(e);
    mostrar("#vista-login");
    errorLogin("No se pudo cargar tu cuenta: " + esc(mensajeError(e)));
  }
});

function pintarBarra() {
  const u = estado.user;
  const nombre = estado.perfil?.nombre || u.displayName || u.email;
  $("#usuario-nombre").textContent = nombre;
  $("#avatar-ini").textContent = iniciales(nombre);
  $("#avatar-ini").style.background = estado.rol === "alumno" ? "var(--rojo)" : "#4A4A4A";
  $("#etiqueta-rol").textContent = { alumno: "Alumno", profesor: "Profesora", admin: "Admin" }[estado.rol] || "";
  const nav = $("#nav");
  if (estado.rol === "alumno") { nav.classList.add("oculto"); nav.innerHTML = ""; return; }
  nav.classList.remove("oculto");
  const tabs = [["staff-lecturas", "Lecturas"], ["staff-resultados", "Resultados"], ["staff-grupos", estado.rol === "admin" ? "Grupos y usuarios" : "Grupos y alumnos"]];
  nav.innerHTML = tabs.map(([v, t]) => `<button data-v="${v}">${t}</button>`).join("");
  nav.querySelectorAll("button").forEach(b => b.addEventListener("click", async () => {
    if (estado.vista === "examen" && estado.examen?.preview) detenerReloj();
    if (estado.vista === "editor" && editor.sucio) {
      if (!await confirmar("¿Salir del editor?", "Hay cambios sin guardar.", "Salir sin guardar")) return;
    }
    navegar(b.dataset.v);
  }));
}
function marcarNav() {
  $("#nav").querySelectorAll("button").forEach(b =>
    b.classList.toggle("activo", estado.vista.startsWith(b.dataset.v) || (b.dataset.v === "staff-lecturas" && ["editor", "examen", "resultados"].includes(estado.vista))));
}

/* ===================================================================
   NAVEGACIÓN
   =================================================================== */
function navegar(vista, datos) {
  estado.vista = vista;
  window.scrollTo(0, 0);
  if (vista !== "examen") detenerReloj();
  const r = {
    perfil: renderPerfil,
    dashboard: renderDashboard,
    examen: renderExamen,
    resultados: renderResultados,
    "staff-lecturas": renderStaffLecturas,
    editor: renderEditor,
    "staff-resultados": renderStaffResultados,
    "staff-grupos": renderStaffGrupos,
  }[vista];
  if (estado.rol !== "alumno") marcarNav();
  r(datos);
}

/* ===================================================================
   PERFIL DEL ALUMNO (primera vez)
   =================================================================== */
function renderPerfil() {
  const u = estado.user;
  const grupos = estado.config.grupos || [];
  main.innerHTML = `
    <div class="encabezado"><div>
      <h1>Bienvenido</h1>
      <p>Antes de empezar, confirma tus datos. Tu profesora los usará para ubicar tus resultados.</p>
    </div></div>
    <div class="tarjeta" style="max-width:560px">
      <div class="campo"><label for="p-nombre">Nombre completo</label>
        <input type="text" id="p-nombre" maxlength="120" value="${esc(u.displayName || "")}" autocomplete="name"></div>
      <div class="campo"><span class="lbl">Correo · matrícula</span>
        <div>${esc(u.email)} · <b>${esc(matricula(u.email))}</b></div></div>
      <div class="campo"><label for="p-grupo">Grupo</label>
        ${grupos.length
          ? `<select id="p-grupo"><option value="">Elige tu grupo…</option>${grupos.map(g => `<option>${esc(g)}</option>`).join("")}</select>`
          : `<input type="text" id="p-grupo" maxlength="60" placeholder="Ej. Inglés A2 – Grupo 1">`}
        <small>Solo tu profesora puede cambiarlo después.</small></div>
      <button class="btn btn-rojo" id="p-guardar">Continuar</button>
    </div>`;
  $("#p-guardar").addEventListener("click", async () => {
    const nombre = $("#p-nombre").value.trim().replace(/\s+/g, " ");
    const grupo = $("#p-grupo").value.trim();
    if (!nombre) return avisar("Falta tu nombre", "Escribe tu nombre completo.");
    if (!grupo) return avisar("Falta tu grupo", "Elige o escribe tu grupo.");
    $("#p-guardar").disabled = true;
    const ok = await conError(async () => {
      const datos = { nombre, correo: minus(u.email), grupo, creado: serverTimestamp() };
      await setDoc(doc(db, "alumnos", u.uid), datos);
      estado.perfil = datos;
      return true;
    });
    if (ok) { pintarBarra(); navegar("dashboard"); }
    else $("#p-guardar").disabled = false;
  });
}

/* ===================================================================
   DATOS COMPARTIDOS
   =================================================================== */
function ordenarLecturas(ls) {
  return ls.sort((a, b) => (a.seccion || "").localeCompare(b.seccion || "", "es")
    || (a.orden ?? 999) - (b.orden ?? 999) || (a.titulo || "").localeCompare(b.titulo || "", "es"));
}
function agruparPorSeccion(ls) {
  const m = new Map();
  ls.forEach(l => {
    const k = l.seccion || "Sin sección";
    if (!m.has(k)) m.set(k, { nombre: k, academia: l.academia || "", lecturas: [] });
    m.get(k).lecturas.push(l);
  });
  // Ordena secciones por el menor "orden" de sus lecturas
  return [...m.values()].sort((a, b) =>
    Math.min(...a.lecturas.map(l => l.orden ?? 999)) - Math.min(...b.lecturas.map(l => l.orden ?? 999))
    || a.nombre.localeCompare(b.nombre, "es"));
}
function calificar(lectura, respuestas, clave) {
  const total = lectura.preguntas.length;
  let aciertos = 0;
  lectura.preguntas.forEach((q, i) => { if (respuestas?.[i] != null && respuestas[i] === clave.correctas[i]) aciertos++; });
  return { aciertos, total, pct: total ? Math.round(aciertos / total * 100) : 0 };
}
async function cargarLecturasStaff(forzar = false) {
  if (estado.cacheLecturas && !forzar) return estado.cacheLecturas;
  const snap = await getDocs(collection(db, "lecturas"));
  estado.cacheLecturas = ordenarLecturas(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  return estado.cacheLecturas;
}

/* ===================================================================
   DASHBOARD (alumno)
   =================================================================== */
async function renderDashboard() {
  cargandoEn(main, "Cargando lecturas…");
  const uid = estado.user.uid;
  const datos = await conError(async () => {
    const [ls, is] = await Promise.all([
      getDocs(query(collection(db, "lecturas"), where("activa", "==", true))),
      getDocs(query(collection(db, "intentos"), where("uid", "==", uid))),
    ]);
    const lecturas = ordenarLecturas(ls.docs.map(d => ({ id: d.id, ...d.data() })));
    const intentos = {};
    is.docs.forEach(d => { intentos[d.data().lecturaId] = d.data(); });
    // Calificaciones de los intentos enviados (la clave solo es legible después de enviar)
    const califs = {};
    await Promise.all(lecturas.map(async l => {
      const it = intentos[l.id];
      if (it?.estado === "enviado" && l.mostrarResultados !== false) {
        try {
          const c = await getDoc(doc(db, "claves", l.id));
          if (c.exists()) califs[l.id] = calificar(l, it.respuestas, c.data());
        } catch (_) { /* sin permiso: no se muestra */ }
      }
    }));
    return { lecturas, intentos, califs };
  });
  if (!datos || estado.vista !== "dashboard") return;
  const { lecturas, intentos, califs } = datos;
  const secciones = agruparPorSeccion(lecturas);
  const enviados = Object.values(intentos).filter(i => i.estado === "enviado").length;

  let html = `
    <div class="encabezado">
      <div>
        <h1>Lecturas disponibles</h1>
        <p>${estado.perfil?.grupo ? `Grupo ${esc(estado.perfil.grupo)} · ` : ""}${lecturas.length} lectura${lecturas.length === 1 ? "" : "s"} · ${enviados} completada${enviados === 1 ? "" : "s"}. Cada lectura tiene un solo intento.</p>
      </div>
    </div>`;
  if (!lecturas.length) html += `<div class="vacio">Todavía no hay lecturas abiertas. Vuelve más tarde.</div>`;

  secciones.forEach(s => {
    const n = s.lecturas.reduce((a, l) => a + l.preguntas.length, 0);
    html += `
      <section class="seccion">
        <div class="seccion-cab">
          <div><h2>${esc(s.nombre)}</h2><div class="meta">${esc(s.academia)}</div></div>
          <div class="meta">${s.lecturas.length} lectura${s.lecturas.length > 1 ? "s" : ""} · ${n} reactivos</div>
        </div>
        <div class="lecturas">`;
    s.lecturas.forEach(l => {
      const it = intentos[l.id];
      const c = califs[l.id];
      let lado;
      if (it?.estado === "enviado") {
        lado = (c ? `<span class="resultado ${c.pct >= 60 ? "ok" : "mal"}">${c.aciertos}/${c.total} · ${c.pct}%</span>` : `<span class="chip verde">Enviado</span>`)
          + (l.mostrarResultados !== false ? `<button class="btn btn-borde" data-rev="${esc(l.id)}">Ver revisión</button>` : "");
      } else if (it?.estado === "en_curso") {
        lado = `<span class="chip ambar">En curso</span><button class="btn btn-rojo" data-ini="${esc(l.id)}">Continuar</button>`;
      } else {
        lado = `<button class="btn btn-rojo" data-ini="${esc(l.id)}">Iniciar</button>`;
      }
      html += `
          <div class="lectura">
            <div>
              <h3>${esc(l.titulo)}</h3>
              <div class="datos">
                <span>${l.preguntas.length} preguntas</span>
                <span>${l.minutos} min</span>
                <span>${l.preguntas[0]?.opciones.length || 0} opciones</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:flex-end">${lado}</div>
          </div>`;
    });
    html += `</div></section>`;
  });
  main.innerHTML = html;

  main.querySelectorAll("[data-ini]").forEach(b => b.addEventListener("click", async () => {
    const l = lecturas.find(x => x.id === b.dataset.ini);
    const it = intentos[l.id];
    if (!it) {
      const ok = await confirmar(`Iniciar "${l.titulo}"`,
        `Tienes ${l.minutos} minutos y un solo intento.\n\nEl tiempo empieza a correr al iniciar y sigue corriendo aunque cierres la página. Tus respuestas se guardan solas.`,
        "Iniciar ahora");
      if (!ok) return;
    }
    b.disabled = true;
    await iniciarExamen(l, it);
    b.disabled = false;
  }));
  main.querySelectorAll("[data-rev]").forEach(b => b.addEventListener("click", async () => {
    const l = lecturas.find(x => x.id === b.dataset.rev);
    const c = await conError(() => getDoc(doc(db, "claves", l.id)));
    if (!c?.exists()) return;
    navegar("resultados", { lectura: l, respuestas: intentos[l.id].respuestas, clave: c.data(), cambiosPestana: intentos[l.id].cambiosPestana, modo: "alumno" });
  }));
}

/* ===================================================================
   EXAMEN
   =================================================================== */
async function iniciarExamen(lectura, intentoPrevio) {
  const uid = estado.user.uid;
  const ref = doc(db, "intentos", idIntento(lectura.id, uid));
  const ok = await conError(async () => {
    if (!intentoPrevio) {
      await setDoc(ref, {
        uid, lecturaId: lectura.id, correo: minus(estado.user.email),
        nombre: estado.perfil?.nombre || estado.user.displayName || "",
        grupo: estado.perfil?.grupo || "",
        estado: "en_curso", inicio: serverTimestamp(), fin: null,
        respuestas: new Array(lectura.preguntas.length).fill(null),
        cambiosPestana: 0, minutos: lectura.minutos, totalPreguntas: lectura.preguntas.length,
      });
    }
    const snap = await getDoc(ref);
    const it = snap.data();
    estado.examen = {
      preview: false, lectura, ref,
      respuestas: [...it.respuestas],
      limite: ms(it.inicio) + it.minutos * 60000,
      cambiosPestana: it.cambiosPestana || 0,
      pendiente: false, enviando: false,
    };
    return true;
  });
  if (ok) navegar("examen");
}

function iniciarVistaPrevia(lectura, clave) {
  estado.examen = {
    preview: true, lectura, clave,
    respuestas: new Array(lectura.preguntas.length).fill(null),
    limite: Date.now() + lectura.minutos * 60000,
    cambiosPestana: 0,
  };
  navegar("examen");
}

function htmlLectura(lectura) {
  return lectura.parrafos.map((p, i) =>
    `<p>${lectura.numerar ? `<span class="parr">[${ROMANOS[i] || i + 1}]</span>` : ""}${esc(p)}</p>`).join("");
}

function renderExamen() {
  const ex = estado.examen;
  const { lectura, respuestas } = ex;

  const preguntas = lectura.preguntas.map((q, i) => `
    <div class="pregunta" data-i="${i}">
      <div class="enunciado"><span class="n">${i + 1}</span><span>${esc(q.enunciado)}</span></div>
      ${q.opciones.map((o, j) => `
        <label class="opcion ${respuestas[i] === j ? "elegida" : ""}">
          <input type="radio" name="q${i}" value="${j}" ${respuestas[i] === j ? "checked" : ""}>
          <span class="letra">${LETRAS[j]}</span><span>${esc(o)}</span>
        </label>`).join("")}
    </div>`).join("");

  main.innerHTML = `
    ${ex.preview ? `<div class="aviso" style="margin-bottom:18px">Vista previa de profesora: nada de esto se guarda.</div>` : ""}
    <div class="encabezado">
      <div>
        <h1>${esc(lectura.titulo)}</h1>
        <p>${esc(lectura.seccion)} · ${lectura.preguntas.length} preguntas · ${lectura.minutos} minutos</p>
      </div>
      <div class="fila-acciones">
        <span class="guardado" id="guardado">${ex.preview ? "" : "Respuestas guardadas"}</span>
        <button class="btn btn-suave" id="btn-volver">${ex.preview ? "Salir de la vista previa" : "Salir (el tiempo sigue)"}</button>
      </div>
    </div>
    <div class="examen">
      <aside class="panel-lectura">
        <h2>${esc(lectura.titulo)}</h2>
        <div class="fuente">${esc(lectura.fuente)}</div>
        ${htmlLectura(lectura)}
      </aside>
      <div class="panel-preguntas">
        <div class="barra-progreso">
          <span class="num" id="progreso-txt">0 / ${lectura.preguntas.length}</span>
          <div class="pista"><i id="progreso-barra"></i></div>
          <span class="reloj" id="reloj">--:--</span>
        </div>
        <div id="aviso-pestana" class="aviso oculto"></div>
        ${preguntas}
        <div class="acciones">
          <button class="btn btn-rojo" id="btn-enviar">Enviar respuestas</button>
        </div>
      </div>
    </div>`;

  main.querySelectorAll('input[type=radio]').forEach(r => r.addEventListener("change", e => {
    const i = +e.target.name.slice(1), j = +e.target.value;
    ex.respuestas[i] = j;
    const caja = main.querySelector(`.pregunta[data-i="${i}"]`);
    caja.querySelectorAll(".opcion").forEach((o, k) => o.classList.toggle("elegida", k === j));
    caja.classList.remove("sin-responder");
    actualizarProgreso();
    programarGuardado();
  }));
  $("#btn-volver").addEventListener("click", async () => {
    if (ex.preview) { navegar("staff-lecturas"); return; }
    const ok = await confirmar("¿Salir del examen?", "Tus respuestas quedan guardadas, pero el tiempo sigue corriendo. Si se acaba, el intento se envía con lo que tengas.", "Salir");
    if (!ok) return;
    await guardarAhora();
    navegar("dashboard");
  });
  $("#btn-enviar").addEventListener("click", () => enviarExamen(false));

  if (ex.cambiosPestana) mostrarAvisoPestana();
  actualizarProgreso();
  iniciarReloj();
}

function actualizarProgreso() {
  const { respuestas } = estado.examen;
  const c = respuestas.filter(r => r !== null).length;
  $("#progreso-txt").textContent = `${c} / ${respuestas.length}`;
  $("#progreso-barra").style.width = (c / respuestas.length * 100) + "%";
}

function programarGuardado() {
  const ex = estado.examen;
  if (ex.preview) return;
  ex.pendiente = true;
  const g = $("#guardado"); if (g) g.textContent = "Guardando…";
  clearTimeout(autosaveId);
  autosaveId = setTimeout(guardarAhora, 700);
}
async function guardarAhora() {
  const ex = estado.examen;
  clearTimeout(autosaveId);
  if (!ex || ex.preview || !ex.pendiente || ex.enviando) return;
  ex.pendiente = false;
  try {
    await updateDoc(ex.ref, { respuestas: ex.respuestas, cambiosPestana: ex.cambiosPestana });
    const g = $("#guardado"); if (g) g.textContent = "Respuestas guardadas";
  } catch (e) {
    console.error(e);
    ex.pendiente = true;
    const g = $("#guardado"); if (g) g.textContent = "Sin conexión: reintentando…";
    autosaveId = setTimeout(guardarAhora, 4000);
  }
}

function iniciarReloj() {
  detenerReloj();
  const pintar = () => {
    const ex = estado.examen;
    const t = Math.max(0, Math.round((ex.limite - Date.now()) / 1000));
    const m = String(Math.floor(t / 60)).padStart(2, "0"), s = String(t % 60).padStart(2, "0");
    const el = $("#reloj");
    if (el) { el.textContent = `${m}:${s}`; el.classList.toggle("alerta", t <= 60); }
    if (t <= 0) { detenerReloj(); enviarExamen(true); }
  };
  pintar();
  timerId = setInterval(pintar, 1000);
}
function detenerReloj() { if (timerId) { clearInterval(timerId); timerId = null; } }

/* Cambio de pestaña: se registra en el intento (anti-distracción, no anti-trampa real) */
document.addEventListener("visibilitychange", () => {
  const ex = estado.examen;
  if (document.hidden && estado.vista === "examen" && ex && !ex.enviando) {
    ex.cambiosPestana++;
    mostrarAvisoPestana();
    if (!ex.preview) { ex.pendiente = true; guardarAhora(); }
  }
});
function mostrarAvisoPestana() {
  const n = estado.examen.cambiosPestana;
  const av = $("#aviso-pestana");
  if (!av) return;
  av.classList.remove("oculto");
  av.textContent = `Saliste de la pestaña ${n} ${n === 1 ? "vez" : "veces"}. Esto quedará registrado en tu intento.`;
}

async function enviarExamen(porTiempo = false) {
  const ex = estado.examen;
  if (!ex || ex.enviando) return;
  const faltan = ex.respuestas.filter(r => r === null).length;
  if (!porTiempo && faltan > 0) {
    main.querySelectorAll(".pregunta").forEach((p, i) => p.classList.toggle("sin-responder", ex.respuestas[i] === null));
    const ok = await confirmar("Preguntas sin responder",
      `Tienes ${faltan} pregunta${faltan > 1 ? "s" : ""} sin responder. Después de enviar ya no podrás cambiar nada.`, "Enviar de todos modos");
    if (!ok) return;
  } else if (!porTiempo) {
    const ok = await confirmar("¿Enviar respuestas?", "Después de enviar ya no podrás cambiarlas.", "Enviar");
    if (!ok) return;
  }
  detenerReloj();
  ex.enviando = true;
  clearTimeout(autosaveId);
  const btn = $("#btn-enviar"); if (btn) { btn.disabled = true; btn.textContent = "Enviando…"; }

  if (ex.preview) {
    navegar("resultados", { lectura: ex.lectura, respuestas: ex.respuestas, clave: ex.clave, cambiosPestana: ex.cambiosPestana, modo: "preview" });
    return;
  }

  let enviado = false;
  try {
    await updateDoc(ex.ref, { respuestas: ex.respuestas, cambiosPestana: ex.cambiosPestana, estado: "enviado", fin: serverTimestamp() });
    enviado = true;
  } catch (e) {
    // Si ya pasó el tiempo límite + tolerancia, las reglas no dejan cambiar respuestas:
    // se cierra el intento con lo último que quedó guardado.
    console.warn("Reintentando envío sin cambiar respuestas", e);
    try {
      await updateDoc(ex.ref, { estado: "enviado", fin: serverTimestamp(), cambiosPestana: ex.cambiosPestana });
      enviado = true;
    } catch (e2) {
      console.error(e2);
      ex.enviando = false;
      if (btn) { btn.disabled = false; btn.textContent = "Enviar respuestas"; }
      await avisar("No se pudo enviar", mensajeError(e2) + "\n\nRevisa tu conexión y vuelve a presionar Enviar.");
      return;
    }
  }
  if (enviado) {
    if (porTiempo) toast("Se acabó el tiempo: tu intento se envió automáticamente.", 4000);
    const snap = await getDoc(ex.ref);
    const respuestas = snap.data().respuestas;
    if (ex.lectura.mostrarResultados === false) {
      navegar("resultados", { lectura: ex.lectura, respuestas, modo: "oculto" });
      return;
    }
    const c = await conError(() => getDoc(doc(db, "claves", ex.lectura.id)));
    navegar("resultados", { lectura: ex.lectura, respuestas, clave: c?.data(), cambiosPestana: ex.cambiosPestana, modo: "alumno" });
  }
}

/* ===================================================================
   RESULTADOS / REVISIÓN
   =================================================================== */
function htmlRevision(lectura, respuestas, clave) {
  return lectura.preguntas.map((q, i) => {
    const correcta = clave.correctas[i];
    const r = respuestas?.[i] ?? null;
    return `
    <div class="pregunta">
      <div class="enunciado"><span class="n">${i + 1}</span><span>${esc(q.enunciado)}</span></div>
      ${q.opciones.map((o, j) => {
        let cls = "";
        if (j === correcta) cls = "correcta";
        else if (r === j) cls = "incorrecta";
        return `<div class="opcion ${cls}"><span class="letra">${LETRAS[j]}</span><span>${esc(o)}</span></div>`;
      }).join("")}
      <div class="justificacion">
        <b>${esc(q.habilidad || "Reactivo " + (i + 1))}</b>
        ${esc(clave.justificaciones?.[i] || (r === correcta ? "Respuesta correcta."
          : r === null ? `No respondiste este reactivo. La respuesta correcta era la opción ${LETRAS[correcta]}.`
          : `La respuesta correcta era la opción ${LETRAS[correcta]}.`))}
      </div>
    </div>`;
  }).join("");
}
function htmlHabilidades(lectura, respuestas, clave) {
  const porHab = {};
  lectura.preguntas.forEach((q, i) => {
    const h = q.habilidad || "General";
    porHab[h] = porHab[h] || { ok: 0, n: 0 };
    porHab[h].n++;
    if (respuestas?.[i] === clave.correctas[i]) porHab[h].ok++;
  });
  return Object.entries(porHab).map(([h, v]) => `
    <div class="hab ${v.ok === v.n ? "perfecta" : ""}">
      <div class="nombre">${esc(h)}</div>
      <div class="frac">${v.ok}<small> / ${v.n}</small></div>
      <div class="mini"><i style="width:${v.ok / v.n * 100}%"></i></div>
    </div>`).join("");
}

function renderResultados({ lectura, respuestas, clave, cambiosPestana, modo, alumno, volver }) {
  const botonVolver = modo === "preview"
    ? `<button class="btn btn-rojo" id="btn-inicio">Volver a lecturas</button>`
    : modo === "staff"
      ? `<button class="btn btn-rojo" id="btn-inicio">Volver a resultados</button>`
      : `<button class="btn btn-rojo" id="btn-inicio">Volver al inicio</button>`;
  const irAtras = () => modo === "preview" ? navegar("staff-lecturas") : modo === "staff" ? navegar("staff-resultados", volver) : navegar("dashboard");

  if (modo === "oculto" || !clave) {
    main.innerHTML = `
      <div class="encabezado"><div><h1>Respuestas enviadas</h1><p>${esc(lectura.titulo)}</p></div>${botonVolver}</div>
      <div class="resumen"><div class="puntaje">✓</div><div>
        <h2>Tu intento quedó registrado</h2>
        <p>Tu profesora revisará los resultados.</p></div></div>`;
    $("#btn-inicio").addEventListener("click", irAtras);
    return;
  }

  const { aciertos, total, pct } = calificar(lectura, respuestas, clave);
  const mensaje = pct >= 90 ? "Excelente comprensión del texto." :
                  pct >= 70 ? "Buen resultado. Revisa los reactivos marcados." :
                  pct >= 60 ? "Aprobado, pero conviene repasar las habilidades más bajas." :
                              "Revisa la retroalimentación de cada reactivo.";

  main.innerHTML = `
    ${modo === "preview" ? `<div class="aviso" style="margin-bottom:18px">Vista previa: este resultado no se guardó.</div>` : ""}
    <div class="encabezado">
      <div>
        <h1>${modo === "staff" ? esc(alumno?.nombre || "Resultado") : "Resultados"}</h1>
        <p>${esc(lectura.titulo)} · ${esc(lectura.seccion)}${modo === "staff" && alumno ? ` · ${esc(alumno.correo)} · ${esc(alumno.grupo || "")}` : ""}</p>
      </div>
      ${botonVolver}
    </div>
    <div class="resumen">
      <div class="puntaje">${pct}<small>%</small></div>
      <div>
        <h2>${aciertos} de ${total} reactivos correctos</h2>
        <p>${modo === "staff" ? "" : mensaje}${cambiosPestana ? ` · Salió de la pestaña ${cambiosPestana} ${cambiosPestana === 1 ? "vez" : "veces"}.` : ""}</p>
      </div>
    </div>
    <h2 style="font-size:18px;margin:0 0 12px">Desempeño por habilidad</h2>
    <div class="habilidades">${htmlHabilidades(lectura, respuestas, clave)}</div>
    <h2 style="font-size:18px;margin:0 0 12px">Revisión de reactivos</h2>
    <div class="panel-preguntas">${htmlRevision(lectura, respuestas, clave)}</div>`;
  $("#btn-inicio").addEventListener("click", irAtras);
}

/* ===================================================================
   STAFF · LECTURAS
   =================================================================== */
async function renderStaffLecturas() {
  cargandoEn(main, "Cargando lecturas…");
  const datos = await conError(async () => {
    const [ls, is] = await Promise.all([cargarLecturasStaff(true), getDocs(collection(db, "intentos"))]);
    const conteo = {};
    is.docs.forEach(d => { const x = d.data(); conteo[x.lecturaId] = (conteo[x.lecturaId] || 0) + 1; });
    return { ls, conteo };
  });
  if (!datos || estado.vista !== "staff-lecturas") return;
  const { ls, conteo } = datos;

  const filas = ls.map(l => `
    <tr>
      <td><b>${esc(l.titulo)}</b><span class="sub">${esc(l.seccion)} · ${esc(l.academia)}</span></td>
      <td class="num">${l.preguntas.length}</td>
      <td class="num">${l.minutos}</td>
      <td class="num">${conteo[l.id] || 0}</td>
      <td>${l.activa ? `<span class="chip verde">Abierta</span>` : `<span class="chip gris">Cerrada</span>`}
          ${l.mostrarResultados === false ? `<span class="chip ambar" title="Los alumnos no ven su calificación">Sin resultados</span>` : ""}</td>
      <td class="acc">
        <button class="btn btn-suave btn-chico" data-toggle="${esc(l.id)}">${l.activa ? "Cerrar" : "Abrir"}</button>
        <button class="btn btn-suave btn-chico" data-prev="${esc(l.id)}">Vista previa</button>
        <button class="btn btn-borde btn-chico" data-edit="${esc(l.id)}">Editar</button>
      </td>
    </tr>`).join("");

  main.innerHTML = `
    <div class="encabezado">
      <div>
        <h1>Lecturas</h1>
        <p>Solo las lecturas <b>abiertas</b> aparecen para los alumnos. Ciérralas cuando termine el periodo del examen.</p>
      </div>
      <div class="fila-acciones">
        ${estado.rol === "admin" ? `<button class="btn btn-suave" id="btn-semilla">Cargar lecturas de ejemplo</button>` : ""}
        <button class="btn btn-rojo" id="btn-nueva">+ Nueva lectura</button>
      </div>
    </div>
    ${ls.length ? `
    <div class="tabla-envoltura"><table class="tabla">
      <thead><tr><th>Lectura</th><th style="text-align:right">Reactivos</th><th style="text-align:right">Min</th><th style="text-align:right">Intentos</th><th>Estado</th><th></th></tr></thead>
      <tbody>${filas}</tbody>
    </table></div>` : `<div class="vacio">Aún no hay lecturas. Crea una nueva${estado.rol === "admin" ? " o carga las de ejemplo" : ""}.</div>`}`;

  $("#btn-nueva").addEventListener("click", () => navegar("editor", null));
  $("#btn-semilla")?.addEventListener("click", cargarEjemplos);
  main.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () =>
    navegar("editor", ls.find(l => l.id === b.dataset.edit))));
  main.querySelectorAll("[data-toggle]").forEach(b => b.addEventListener("click", async () => {
    const l = ls.find(x => x.id === b.dataset.toggle);
    b.disabled = true;
    const ok = await conError(() => updateDoc(doc(db, "lecturas", l.id), { activa: !l.activa }));
    if (ok !== undefined) { toast(l.activa ? "Lectura cerrada" : "Lectura abierta para alumnos"); renderStaffLecturas(); }
    else b.disabled = false;
  }));
  main.querySelectorAll("[data-prev]").forEach(b => b.addEventListener("click", async () => {
    const l = ls.find(x => x.id === b.dataset.prev);
    const c = await conError(() => getDoc(doc(db, "claves", l.id)));
    if (c) iniciarVistaPrevia(l, c.exists() ? c.data() : { correctas: [], justificaciones: [] });
  }));
}

async function cargarEjemplos() {
  const ok = await confirmar("Cargar lecturas de ejemplo",
    "Se agregarán las 6 lecturas del prototipo (cerradas, para que las revises antes de abrirlas). Si ya existen, se sobrescriben.", "Cargar");
  if (!ok) return;
  const listo = await conError(async () => {
    const { LECTURAS_EJEMPLO } = await import("./seed.js");
    const batch = writeBatch(db);
    LECTURAS_EJEMPLO.forEach(l => {
      batch.set(doc(db, "lecturas", l.id), {
        titulo: l.titulo, seccion: l.seccion, academia: l.academia, fuente: l.fuente,
        minutos: l.minutos, numerar: l.numerar, parrafos: l.parrafos, orden: l.orden,
        preguntas: l.preguntas.map(q => ({ enunciado: q.enunciado, opciones: q.opciones, habilidad: q.habilidad })),
        activa: false, mostrarResultados: true, actualizado: serverTimestamp(),
      });
      batch.set(doc(db, "claves", l.id), {
        correctas: l.preguntas.map(q => q.correcta),
        justificaciones: l.preguntas.map(q => q.justificacion || ""),
      });
    });
    await batch.commit();
    return true;
  });
  if (listo) { toast("Lecturas de ejemplo cargadas"); renderStaffLecturas(); }
}

/* ===================================================================
   STAFF · EDITOR DE LECTURAS
   =================================================================== */
const editor = { id: null, nuevo: true, datos: null, sucio: false, intentos: 0 };

function preguntaVacia() {
  return { enunciado: "", opciones: ["", "", ""], habilidad: "", correcta: null, justificacion: "" };
}

async function renderEditor(lectura) {
  // Preparar datos del editor
  if (lectura === undefined && editor.datos) {
    // re-render interno: conservar estado
  } else if (lectura) {
    cargandoEn(main, "Abriendo lectura…");
    const res = await conError(async () => {
      const [c, is] = await Promise.all([
        getDoc(doc(db, "claves", lectura.id)),
        getDocs(query(collection(db, "intentos"), where("lecturaId", "==", lectura.id))),
      ]);
      return { clave: c.exists() ? c.data() : { correctas: [], justificaciones: [] }, n: is.size };
    });
    if (!res) return navegar("staff-lecturas");
    editor.id = lectura.id; editor.nuevo = false; editor.intentos = res.n;
    editor.datos = {
      titulo: lectura.titulo || "", seccion: lectura.seccion || "", academia: lectura.academia || "",
      fuente: lectura.fuente || "", minutos: lectura.minutos || 15, numerar: !!lectura.numerar,
      activa: !!lectura.activa, mostrarResultados: lectura.mostrarResultados !== false,
      orden: lectura.orden ?? 1,
      texto: (lectura.parrafos || []).join("\n\n"),
      preguntas: (lectura.preguntas || []).map((q, i) => ({
        enunciado: q.enunciado, opciones: [...q.opciones], habilidad: q.habilidad || "",
        correcta: res.clave.correctas?.[i] ?? null, justificacion: res.clave.justificaciones?.[i] || "",
      })),
    };
    editor.sucio = false;
  } else {
    editor.id = null; editor.nuevo = true; editor.intentos = 0; editor.sucio = false;
    const ls = estado.cacheLecturas || [];
    editor.datos = {
      titulo: "", seccion: "", academia: "Academia de Inglés", fuente: "", minutos: 15, numerar: true,
      activa: false, mostrarResultados: true, orden: ls.length + 1, texto: "", preguntas: [preguntaVacia()],
    };
  }
  pintarEditor();
}

function pintarEditor() {
  const d = editor.datos;
  const ls = estado.cacheLecturas || [];
  const unicos = k => [...new Set(ls.map(l => l[k]).filter(Boolean))];
  const habilidades = [...new Set(ls.flatMap(l => l.preguntas.map(q => q.habilidad)).filter(Boolean)
    .concat(["Main idea", "Specific information", "Inference", "Vocabulary in context", "Cause / effect", "Author's purpose", "Reference", "Supporting detail"]))];

  const preguntas = d.preguntas.map((q, i) => `
    <div class="q-editor" data-q="${i}">
      <div class="q-cab">
        <b>Pregunta ${i + 1}</b>
        <div class="fila-acciones">
          <button class="btn-icono" data-acc="subir" title="Subir" ${i === 0 ? "disabled" : ""}>↑</button>
          <button class="btn-icono" data-acc="bajar" title="Bajar" ${i === d.preguntas.length - 1 ? "disabled" : ""}>↓</button>
          <button class="btn-icono" data-acc="borrar" title="Eliminar pregunta">✕</button>
        </div>
      </div>
      <div class="campo"><textarea rows="2" data-f="enunciado" placeholder="Enunciado de la pregunta">${esc(q.enunciado)}</textarea></div>
      <div class="lbl" style="font-size:13px;font-weight:700;margin-bottom:6px">Opciones <span style="font-weight:400;color:var(--gris-texto)">(marca la correcta)</span></div>
      ${q.opciones.map((o, j) => `
        <div class="op-fila ${q.correcta === j ? "es-correcta" : ""}">
          <input type="radio" name="c${i}" data-correcta="${j}" ${q.correcta === j ? "checked" : ""} aria-label="Opción ${LETRAS[j]} es la correcta">
          <span class="letra">${LETRAS[j]}</span>
          <input type="text" data-op="${j}" value="${esc(o)}" placeholder="Opción ${LETRAS[j]}">
          <button class="btn-icono" data-acc="quitar-op" data-j="${j}" title="Quitar opción" ${q.opciones.length <= 2 ? "disabled" : ""}>−</button>
        </div>`).join("")}
      ${q.opciones.length < 5 ? `<button class="btn btn-suave btn-chico" data-acc="agregar-op" style="margin-bottom:12px">+ Opción</button>` : ""}
      <div class="rejilla">
        <div class="campo"><label>Habilidad</label><input type="text" data-f="habilidad" list="dl-hab" value="${esc(q.habilidad)}" placeholder="Ej. Main idea"></div>
        <div class="campo"><label>Justificación <small>(opcional, se muestra en la revisión)</small></label><textarea rows="2" data-f="justificacion">${esc(q.justificacion)}</textarea></div>
      </div>
    </div>`).join("");

  main.innerHTML = `
    <div class="encabezado">
      <div>
        <h1>${editor.nuevo ? "Nueva lectura" : "Editar lectura"}</h1>
        <p>${editor.nuevo ? "Captura el texto y los reactivos. Puedes pegar las preguntas desde Word con el importador." : `ID: ${esc(editor.id)}`}</p>
      </div>
      <button class="btn btn-suave" id="ed-cancelar">Volver</button>
    </div>
    ${editor.intentos ? `<div class="aviso" style="margin-bottom:18px">Esta lectura ya tiene ${editor.intentos} intento${editor.intentos > 1 ? "s" : ""}. Si cambias el número u orden de las preguntas o las respuestas correctas, cambian sus calificaciones.</div>` : ""}

    <div class="tarjeta">
      <h2>Datos generales</h2>
      <div class="campo"><label for="ed-titulo">Título</label><input type="text" id="ed-titulo" data-g="titulo" value="${esc(d.titulo)}"></div>
      <div class="rejilla">
        <div class="campo"><label>Sección</label><input type="text" data-g="seccion" list="dl-sec" value="${esc(d.seccion)}" placeholder="Ej. Reading Comprehension — Nivel A2"></div>
        <div class="campo"><label>Academia</label><input type="text" data-g="academia" list="dl-aca" value="${esc(d.academia)}"></div>
        <div class="campo"><label>Minutos</label><input type="number" min="1" max="240" data-g="minutos" value="${esc(d.minutos)}"></div>
        <div class="campo"><label>Orden en la lista</label><input type="number" min="1" data-g="orden" value="${esc(d.orden)}"></div>
      </div>
      <div class="campo"><label>Fuente</label><input type="text" data-g="fuente" value="${esc(d.fuente)}" placeholder="Autor, año, sitio…"></div>
      <label class="check"><input type="checkbox" data-g="numerar" ${d.numerar ? "checked" : ""}> Numerar párrafos [I], [II]…</label>
      <label class="check"><input type="checkbox" data-g="mostrarResultados" ${d.mostrarResultados ? "checked" : ""}> Mostrar calificación y respuestas correctas al alumno después de enviar</label>
      <label class="check"><input type="checkbox" data-g="activa" ${d.activa ? "checked" : ""}> Abierta para alumnos</label>
    </div>

    <div class="tarjeta">
      <h2>Texto de la lectura</h2>
      <div class="campo">
        <textarea rows="12" data-g="texto" placeholder="Pega aquí el texto. Deja una línea en blanco entre párrafos.">${esc(d.texto)}</textarea>
        <small id="ed-parrafos"></small>
      </div>
    </div>

    <div class="tarjeta">
      <div class="fila-acciones" style="justify-content:space-between;margin-bottom:14px">
        <h2 style="margin:0">Preguntas (${d.preguntas.length})</h2>
        <button class="btn btn-borde btn-chico" id="ed-importar">Importar desde texto</button>
      </div>
      <div id="ed-importador" class="oculto" style="margin-bottom:18px">
        <p style="margin:0 0 8px;font-size:14px">Copia las preguntas de Word y pégalas con este formato. Marca la correcta con <b>*</b> al final, o agrega una línea <b>Respuesta: B</b>.</p>
        <pre class="formato">1. What is the main idea of the text?
a) Option one
b) Option two *
c) Option three
Habilidad: Main idea
Justificación: El párrafo 1 dice que…

2. According to paragraph 2, why…?
A. …
B. …
C. …
Respuesta: C</pre>
        <textarea rows="10" id="ed-texto-import" placeholder="Pega aquí las preguntas…"></textarea>
        <div class="fila-acciones" style="margin-top:10px">
          <button class="btn btn-rojo btn-chico" data-imp="reemplazar">Reemplazar preguntas</button>
          <button class="btn btn-borde btn-chico" data-imp="agregar">Agregar al final</button>
          <span class="guardado" id="ed-import-res"></span>
        </div>
      </div>
      <div id="ed-preguntas">${preguntas}</div>
      <button class="btn btn-borde" id="ed-agregar">+ Agregar pregunta</button>
    </div>

    <div class="pegajoso fila-acciones" style="justify-content:space-between">
      <div>${!editor.nuevo ? `<button class="btn btn-peligro" id="ed-eliminar">Eliminar lectura</button>` : ""}</div>
      <div class="fila-acciones">
        <span class="guardado" id="ed-estado">${editor.sucio ? "Cambios sin guardar" : ""}</span>
        <button class="btn btn-rojo" id="ed-guardar">Guardar lectura</button>
      </div>
    </div>

    <datalist id="dl-sec">${unicos("seccion").map(s => `<option value="${esc(s)}">`).join("")}</datalist>
    <datalist id="dl-aca">${unicos("academia").map(s => `<option value="${esc(s)}">`).join("")}</datalist>
    <datalist id="dl-hab">${habilidades.map(s => `<option value="${esc(s)}">`).join("")}</datalist>`;

  contarParrafos();
  const sucio = () => { editor.sucio = true; const e = $("#ed-estado"); if (e) e.textContent = "Cambios sin guardar"; };

  // Campos generales
  main.querySelectorAll("[data-g]").forEach(el => el.addEventListener(el.type === "checkbox" ? "change" : "input", () => {
    const k = el.dataset.g;
    d[k] = el.type === "checkbox" ? el.checked : el.type === "number" ? (el.value === "" ? "" : +el.value) : el.value;
    if (k === "texto") contarParrafos();
    sucio();
  }));

  // Preguntas (delegación)
  const cont = $("#ed-preguntas");
  cont.addEventListener("input", e => {
    const caja = e.target.closest("[data-q]"); if (!caja) return;
    const q = d.preguntas[+caja.dataset.q];
    if (e.target.dataset.f) q[e.target.dataset.f] = e.target.value;
    if (e.target.dataset.op !== undefined) q.opciones[+e.target.dataset.op] = e.target.value;
    sucio();
  });
  cont.addEventListener("change", e => {
    const caja = e.target.closest("[data-q]"); if (!caja) return;
    if (e.target.dataset.correcta !== undefined) {
      const q = d.preguntas[+caja.dataset.q];
      q.correcta = +e.target.dataset.correcta;
      caja.querySelectorAll(".op-fila").forEach((f, k) => f.classList.toggle("es-correcta", k === q.correcta));
      sucio();
    }
  });
  cont.addEventListener("click", e => {
    const b = e.target.closest("[data-acc]"); if (!b) return;
    const i = +b.closest("[data-q]").dataset.q;
    const ps = d.preguntas, q = ps[i];
    switch (b.dataset.acc) {
      case "subir": [ps[i - 1], ps[i]] = [ps[i], ps[i - 1]]; break;
      case "bajar": [ps[i + 1], ps[i]] = [ps[i], ps[i + 1]]; break;
      case "borrar": ps.splice(i, 1); break;
      case "agregar-op": q.opciones.push(""); break;
      case "quitar-op": {
        const j = +b.dataset.j;
        q.opciones.splice(j, 1);
        if (q.correcta === j) q.correcta = null;
        else if (q.correcta > j) q.correcta--;
        break;
      }
    }
    sucio();
    repintarConScroll();
  });

  $("#ed-agregar").addEventListener("click", () => {
    d.preguntas.push(preguntaVacia()); sucio(); repintarConScroll();
    const cajas = main.querySelectorAll(".q-editor");
    cajas[cajas.length - 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  $("#ed-importar").addEventListener("click", () => $("#ed-importador").classList.toggle("oculto"));
  main.querySelectorAll("[data-imp]").forEach(b => b.addEventListener("click", () => {
    const { preguntas: nuevas, avisos } = parsearPreguntas($("#ed-texto-import").value);
    if (!nuevas.length) { $("#ed-import-res").textContent = "No encontré preguntas. Revisa el formato."; return; }
    if (b.dataset.imp === "reemplazar") d.preguntas = nuevas;
    else d.preguntas = d.preguntas.filter(q => q.enunciado.trim() || q.opciones.some(o => o.trim())).concat(nuevas);
    sucio();
    repintarConScroll();
    toast(`${nuevas.length} pregunta${nuevas.length > 1 ? "s" : ""} importada${nuevas.length > 1 ? "s" : ""}`);
    if (avisos.length) avisar("Revisa estas preguntas", avisos.join("\n"));
  }));

  $("#ed-cancelar").addEventListener("click", async () => {
    if (editor.sucio && !await confirmar("¿Salir sin guardar?", "Perderás los cambios.", "Salir")) return;
    editor.sucio = false; editor.datos = null;
    navegar("staff-lecturas");
  });
  $("#ed-guardar").addEventListener("click", guardarLectura);
  $("#ed-eliminar")?.addEventListener("click", eliminarLectura);
}

function repintarConScroll() {
  const y = window.scrollY;
  pintarEditor();
  window.scrollTo(0, y);
}
function contarParrafos() {
  const n = parrafosDe(editor.datos.texto).length;
  const el = $("#ed-parrafos"); if (el) el.textContent = `${n} párrafo${n === 1 ? "" : "s"} detectado${n === 1 ? "" : "s"}.`;
}
function parrafosDe(texto) {
  return String(texto || "").replace(/\r/g, "").split(/\n\s*\n/).map(p => p.replace(/\s*\n\s*/g, " ").trim()).filter(Boolean);
}

/* Importador: convierte texto pegado (de Word) en preguntas */
function parsearPreguntas(texto) {
  const lineas = String(texto || "").replace(/\r/g, "").split("\n").map(l => l.replace(/ /g, " ").trim());
  const preguntas = [];
  const avisos = [];
  let q = null;
  let ultimo = null; // 'enunciado' | 'opcion' | 'justificacion'
  const cerrar = () => {
    if (!q) return;
    q.opciones = q.opciones.map(o => o.trim());
    if (q.correcta == null) avisos.push(`Pregunta ${preguntas.length + 1}: no tiene respuesta correcta marcada.`);
    if (q.opciones.length < 2) avisos.push(`Pregunta ${preguntas.length + 1}: tiene menos de 2 opciones.`);
    if (q.opciones.length > 5) { avisos.push(`Pregunta ${preguntas.length + 1}: tenía más de 5 opciones; se recortó a 5.`); q.opciones = q.opciones.slice(0, 5); }
    preguntas.push(q);
    q = null;
  };
  const reOpcion = /^\(?([a-eA-E])\s*[\).:\-]\s+(.*)$/;
  const rePregunta = /^(?:\d{1,3}\s*[\).:\-]|[Pp]regunta\s*\d+\s*[\).:\-]?|[Qq]\s*\d+\s*[\).:\-]?)\s*(.*)$/;
  const marcaCorrecta = /\s*(\*|\(correct[ao]?\)|\[correct[ao]?\]|✓|✔)\s*$/i;

  for (const l of lineas) {
    if (!l) { ultimo = null; continue; }
    let m;
    if ((m = l.match(/^(respuesta|answer|correcta|clave)\s*(correcta)?\s*[:\-]\s*\(?([a-eA-E])\)?/i)) && q) {
      q.correcta = LETRAS.indexOf(m[3].toUpperCase());
      continue;
    }
    if ((m = l.match(/^(habilidad|skill)\s*[:\-]\s*(.*)$/i)) && q) { q.habilidad = m[2].trim(); ultimo = null; continue; }
    if ((m = l.match(/^(justificaci[oó]n|explicaci[oó]n|retroalimentaci[oó]n|feedback)\s*[:\-]\s*(.*)$/i)) && q) {
      q.justificacion = m[2].trim(); ultimo = "justificacion"; continue;
    }
    if ((m = l.match(reOpcion)) && q && (q.opciones.length > 0 || ultimo === "enunciado")) {
      const idx = LETRAS.indexOf(m[1].toUpperCase());
      let txt = m[2];
      if (marcaCorrecta.test(txt)) { txt = txt.replace(marcaCorrecta, ""); q.correcta = idx; }
      if (idx === q.opciones.length) { q.opciones.push(txt); ultimo = "opcion"; continue; }
    }
    if ((m = l.match(rePregunta))) {
      cerrar();
      q = { enunciado: m[1].trim(), opciones: [], habilidad: "", correcta: null, justificacion: "" };
      ultimo = "enunciado";
      continue;
    }
    // Línea de continuación
    if (!q) { q = { enunciado: l, opciones: [], habilidad: "", correcta: null, justificacion: "" }; ultimo = "enunciado"; continue; }
    if (ultimo === "enunciado" && !q.opciones.length) q.enunciado += " " + l;
    else if (ultimo === "opcion") {
      let txt = l;
      const k = q.opciones.length - 1;
      if (marcaCorrecta.test(txt)) { txt = txt.replace(marcaCorrecta, ""); q.correcta = k; }
      q.opciones[k] += " " + txt;
    }
    else if (ultimo === "justificacion") q.justificacion += " " + l;
    else if (!q.opciones.length) { q.enunciado += " " + l; ultimo = "enunciado"; }
  }
  cerrar();
  return { preguntas: preguntas.filter(p => p.enunciado || p.opciones.length), avisos };
}

function validarLectura(d) {
  const errores = [];
  if (!d.titulo.trim()) errores.push("Falta el título.");
  if (!d.seccion.trim()) errores.push("Falta la sección.");
  if (!(d.minutos >= 1)) errores.push("Los minutos deben ser 1 o más.");
  if (!parrafosDe(d.texto).length) errores.push("Falta el texto de la lectura.");
  if (!d.preguntas.length) errores.push("Agrega al menos una pregunta.");
  d.preguntas.forEach((q, i) => {
    const n = `Pregunta ${i + 1}`;
    if (!q.enunciado.trim()) errores.push(`${n}: falta el enunciado.`);
    if (q.opciones.filter(o => o.trim()).length !== q.opciones.length) errores.push(`${n}: hay opciones vacías.`);
    if (q.opciones.length < 2) errores.push(`${n}: necesita al menos 2 opciones.`);
    if (q.correcta == null || q.correcta >= q.opciones.length) errores.push(`${n}: marca la respuesta correcta.`);
  });
  return errores;
}

async function guardarLectura() {
  const d = editor.datos;
  const errores = validarLectura(d);
  if (errores.length) return avisar("Revisa la lectura", errores.slice(0, 12).join("\n") + (errores.length > 12 ? `\n…y ${errores.length - 12} más.` : ""));
  const btn = $("#ed-guardar"); btn.disabled = true; btn.textContent = "Guardando…";
  const id = editor.id || `${slug(d.titulo)}-${Math.random().toString(36).slice(2, 6)}`;
  const ok = await conError(async () => {
    const batch = writeBatch(db);
    batch.set(doc(db, "lecturas", id), {
      titulo: d.titulo.trim(), seccion: d.seccion.trim(), academia: d.academia.trim(), fuente: d.fuente.trim(),
      minutos: Math.round(+d.minutos), orden: Math.round(+d.orden || 1), numerar: !!d.numerar,
      activa: !!d.activa, mostrarResultados: !!d.mostrarResultados,
      parrafos: parrafosDe(d.texto),
      preguntas: d.preguntas.map(q => ({ enunciado: q.enunciado.trim(), opciones: q.opciones.map(o => o.trim()), habilidad: q.habilidad.trim() })),
      actualizado: serverTimestamp(),
    });
    batch.set(doc(db, "claves", id), {
      correctas: d.preguntas.map(q => q.correcta),
      justificaciones: d.preguntas.map(q => (q.justificacion || "").trim()),
    });
    await batch.commit();
    return true;
  });
  if (ok) {
    editor.sucio = false; editor.datos = null;
    toast("Lectura guardada");
    navegar("staff-lecturas");
  } else { btn.disabled = false; btn.textContent = "Guardar lectura"; }
}

async function eliminarLectura() {
  const ok = await confirmar("¿Eliminar esta lectura?",
    `"${editor.datos.titulo}" desaparecerá para todos.${editor.intentos ? ` Sus ${editor.intentos} intentos se conservan, pero ya no podrás ver su revisión.` : ""}\n\nSi solo quieres ocultarla, mejor ciérrala.`, "Eliminar", "btn-rojo");
  if (!ok) return;
  const listo = await conError(async () => {
    const batch = writeBatch(db);
    batch.delete(doc(db, "lecturas", editor.id));
    batch.delete(doc(db, "claves", editor.id));
    await batch.commit();
    return true;
  });
  if (listo) { editor.sucio = false; editor.datos = null; toast("Lectura eliminada"); navegar("staff-lecturas"); }
}

/* ===================================================================
   STAFF · RESULTADOS
   =================================================================== */
const filtros = { lecturaId: "", grupo: "" };

async function renderStaffResultados(volver) {
  if (volver) Object.assign(filtros, volver);
  cargandoEn(main, "Cargando resultados…");
  const datos = await conError(async () => {
    const [ls, is, as, cs] = await Promise.all([
      cargarLecturasStaff(true),
      getDocs(collection(db, "intentos")),
      getDocs(collection(db, "alumnos")),
      getDocs(collection(db, "claves")),
    ]);
    const alumnos = {}; as.docs.forEach(d => { alumnos[d.id] = d.data(); });
    const claves = {}; cs.docs.forEach(d => { claves[d.id] = d.data(); });
    const intentos = is.docs.map(d => ({ id: d.id, ...d.data() }));
    return { ls, alumnos, claves, intentos };
  });
  if (!datos || estado.vista !== "staff-resultados") return;
  const { ls, alumnos, claves, intentos } = datos;

  if (!filtros.lecturaId || !ls.find(l => l.id === filtros.lecturaId)) {
    // Por defecto: la lectura con intentos más recientes
    const conIntentos = ls.filter(l => intentos.some(i => i.lecturaId === l.id));
    filtros.lecturaId = (conIntentos[0] || ls[0])?.id || "";
  }
  const lectura = ls.find(l => l.id === filtros.lecturaId);
  const clave = lectura ? claves[lectura.id] : null;
  const grupoDe = it => alumnos[it.uid]?.grupo || it.grupo || "";
  const nombreDe = it => alumnos[it.uid]?.nombre || it.nombre || it.correo;
  const grupos = [...new Set([...(estado.config.grupos || []), ...intentos.map(grupoDe), ...Object.values(alumnos).map(a => a.grupo)].filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));

  let filas = intentos
    .filter(it => it.lecturaId === filtros.lecturaId)
    .filter(it => !filtros.grupo || grupoDe(it) === filtros.grupo)
    .map(it => {
      const c = it.estado === "enviado" && clave && lectura ? calificar(lectura, it.respuestas, clave) : null;
      const dur = it.fin && it.inicio ? Math.round((ms(it.fin) - ms(it.inicio)) / 60000) : null;
      const tarde = it.fin && it.inicio && (ms(it.fin) - ms(it.inicio)) > it.minutos * 60000 + TOLERANCIA_MS;
      return { it, c, dur, tarde, nombre: nombreDe(it), grupo: grupoDe(it) };
    })
    .sort((a, b) => a.grupo.localeCompare(b.grupo, "es") || a.nombre.localeCompare(b.nombre, "es"));

  // Estadísticas
  const enviados = filas.filter(f => f.c);
  const prom = enviados.length ? Math.round(enviados.reduce((a, f) => a + f.c.pct, 0) / enviados.length) : null;
  const aprob = enviados.length ? Math.round(enviados.filter(f => f.c.pct >= 60).length / enviados.length * 100) : null;
  const itemsHtml = lectura && clave && enviados.length ? lectura.preguntas.map((q, i) => {
    const ok = enviados.filter(f => f.it.respuestas?.[i] === clave.correctas[i]).length;
    const p = Math.round(ok / enviados.length * 100);
    return `<div class="item ${p < 50 ? "bajo" : ""}" title="${esc(q.enunciado)}">P${i + 1} · <b>${p}%</b><div class="mini"><i style="width:${p}%"></i></div></div>`;
  }).join("") : "";

  const tabla = filas.map((f, k) => `
    <tr>
      <td><b>${esc(f.nombre)}</b><span class="sub">${esc(f.it.correo)}</span></td>
      <td>${esc(f.grupo)}</td>
      <td>${f.it.estado === "enviado" ? `<span class="chip verde">Enviado</span>` : `<span class="chip ambar">En curso</span>`}${f.tarde ? ` <span class="chip rojo" title="Envió después del tiempo límite + tolerancia">Tarde</span>` : ""}</td>
      <td class="num">${f.c ? `${f.c.aciertos}/${f.c.total}` : "—"}</td>
      <td class="num"><b>${f.c ? f.c.pct + "%" : "—"}</b></td>
      <td class="num">${f.dur != null ? f.dur + " min" : "—"}</td>
      <td class="num">${f.it.cambiosPestana || 0}</td>
      <td>${fecha(f.it.inicio)}</td>
      <td class="acc">
        ${f.c ? `<button class="btn btn-suave btn-chico" data-ver="${k}">Ver</button>` : ""}
        <button class="btn btn-peligro btn-chico" data-reset="${k}" title="Borra el intento para que pueda volver a hacerlo">Reiniciar</button>
      </td>
    </tr>`).join("");

  main.innerHTML = `
    <div class="encabezado">
      <div><h1>Resultados</h1><p>La calificación se calcula con la clave vigente de cada lectura.</p></div>
      <div class="fila-acciones">
        <button class="btn btn-borde" id="btn-csv" ${filas.length ? "" : "disabled"}>Descargar esta lectura (Excel)</button>
        <button class="btn btn-suave" id="btn-csv-todo" ${intentos.length ? "" : "disabled"}>Descargar todo</button>
      </div>
    </div>
    <div class="tarjeta">
      <div class="en-linea">
        <div class="campo" style="margin:0"><label for="f-lectura">Lectura</label>
          <select id="f-lectura">${ls.map(l => `<option value="${esc(l.id)}" ${l.id === filtros.lecturaId ? "selected" : ""}>${esc(l.titulo)} — ${esc(l.seccion)}</option>`).join("")}</select></div>
        <div class="campo" style="margin:0"><label for="f-grupo">Grupo</label>
          <select id="f-grupo"><option value="">Todos los grupos</option>${grupos.map(g => `<option ${g === filtros.grupo ? "selected" : ""}>${esc(g)}</option>`).join("")}</select></div>
      </div>
    </div>
    ${lectura ? `
    <div class="stats">
      <div class="stat"><b>${filas.length}</b><span>intentos</span></div>
      <div class="stat"><b>${enviados.length}</b><span>enviados</span></div>
      <div class="stat"><b>${prom != null ? prom + "%" : "—"}</b><span>promedio</span></div>
      <div class="stat"><b>${aprob != null ? aprob + "%" : "—"}</b><span>aprobados (≥ 60%)</span></div>
    </div>
    ${itemsHtml ? `<h2 style="font-size:16px;margin:0 0 10px">Aciertos por pregunta</h2><div class="items" style="margin-bottom:22px">${itemsHtml}</div>` : ""}
    ${filas.length ? `<div class="tabla-envoltura"><table class="tabla">
      <thead><tr><th>Alumno</th><th>Grupo</th><th>Estado</th><th style="text-align:right">Aciertos</th><th style="text-align:right">%</th><th style="text-align:right">Duración</th><th style="text-align:right" title="Veces que salió de la pestaña">Salidas</th><th>Inicio</th><th></th></tr></thead>
      <tbody>${tabla}</tbody></table></div>` : `<div class="vacio">Nadie ha presentado esta lectura${filtros.grupo ? " en este grupo" : ""} todavía.</div>`}
    ` : `<div class="vacio">No hay lecturas.</div>`}`;

  $("#f-lectura")?.addEventListener("change", e => { filtros.lecturaId = e.target.value; renderStaffResultados(); });
  $("#f-grupo")?.addEventListener("change", e => { filtros.grupo = e.target.value; renderStaffResultados(); });
  main.querySelectorAll("[data-ver]").forEach(b => b.addEventListener("click", () => {
    const f = filas[+b.dataset.ver];
    navegar("resultados", { lectura, respuestas: f.it.respuestas, clave, cambiosPestana: f.it.cambiosPestana, modo: "staff",
      alumno: { nombre: f.nombre, correo: f.it.correo, grupo: f.grupo }, volver: { ...filtros } });
  }));
  main.querySelectorAll("[data-reset]").forEach(b => b.addEventListener("click", async () => {
    const f = filas[+b.dataset.reset];
    const ok = await confirmar("¿Reiniciar intento?", `Se borrará el intento de ${f.nombre} en "${lectura.titulo}" y podrá presentarlo de nuevo. No se puede deshacer.`, "Reiniciar");
    if (!ok) return;
    const r = await conError(() => deleteDoc(doc(db, "intentos", f.it.id)));
    if (r !== undefined) { toast("Intento reiniciado"); renderStaffResultados(); }
  }));
  $("#btn-csv")?.addEventListener("click", () => {
    const encab = ["Lectura", "Sección", "Alumno", "Correo", "Matrícula", "Grupo", "Estado", "Aciertos", "Total", "Porcentaje", "Inicio", "Fin", "Duración (min)", "Salidas de pestaña", "Tarde"]
      .concat(lectura.preguntas.map((_, i) => `P${i + 1}`));
    const rows = filas.map(f => [lectura.titulo, lectura.seccion, f.nombre, f.it.correo, matricula(f.it.correo), f.grupo,
      f.it.estado === "enviado" ? "Enviado" : "En curso", f.c?.aciertos ?? "", f.c?.total ?? lectura.preguntas.length, f.c ? f.c.pct : "",
      fechaCSV(f.it.inicio), fechaCSV(f.it.fin), f.dur ?? "", f.it.cambiosPestana || 0, f.tarde ? "Sí" : ""]
      .concat(lectura.preguntas.map((_, i) => {
        const r = f.it.respuestas?.[i];
        if (r == null) return "";
        return LETRAS[r] + (clave && r === clave.correctas[i] ? " ✓" : "");
      })));
    descargarCSV(`resultados-${slug(lectura.titulo)}${filtros.grupo ? "-" + slug(filtros.grupo) : ""}.csv`, [encab, ...rows]);
  });
  $("#btn-csv-todo")?.addEventListener("click", () => {
    const porId = Object.fromEntries(ls.map(l => [l.id, l]));
    const encab = ["Lectura", "Sección", "Alumno", "Correo", "Matrícula", "Grupo", "Estado", "Aciertos", "Total", "Porcentaje", "Inicio", "Fin", "Duración (min)", "Salidas de pestaña"];
    const rows = intentos
      .filter(it => !filtros.grupo || grupoDe(it) === filtros.grupo)
      .map(it => {
        const l = porId[it.lecturaId];
        const c = l && claves[l.id] && it.estado === "enviado" ? calificar(l, it.respuestas, claves[l.id]) : null;
        const dur = it.fin && it.inicio ? Math.round((ms(it.fin) - ms(it.inicio)) / 60000) : "";
        return [l?.titulo || it.lecturaId, l?.seccion || "", nombreDe(it), it.correo, matricula(it.correo), grupoDe(it),
          it.estado === "enviado" ? "Enviado" : "En curso", c?.aciertos ?? "", c?.total ?? "", c ? c.pct : "",
          fechaCSV(it.inicio), fechaCSV(it.fin), dur, it.cambiosPestana || 0];
      })
      .sort((a, b) => String(a[5]).localeCompare(String(b[5]), "es") || String(a[2]).localeCompare(String(b[2]), "es") || String(a[0]).localeCompare(String(b[0]), "es"));
    descargarCSV(`resultados-todos${filtros.grupo ? "-" + slug(filtros.grupo) : ""}.csv`, [encab, ...rows]);
  });
}

function descargarCSV(nombre, filas) {
  const celda = v => {
    const s = String(v ?? "");
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = "﻿" + filas.map(r => r.map(celda).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url; a.download = nombre;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ===================================================================
   STAFF · GRUPOS, ALUMNOS Y PROFESORAS
   =================================================================== */
async function renderStaffGrupos() {
  cargandoEn(main);
  const esAdmin = estado.rol === "admin";
  const datos = await conError(async () => {
    const [as, rs, cfg] = await Promise.all([
      getDocs(collection(db, "alumnos")),
      esAdmin ? getDocs(collection(db, "roles")) : Promise.resolve(null),
      getDoc(doc(db, "config", "general")),
    ]);
    estado.config = cfg.exists() ? { grupos: [], ...cfg.data() } : { grupos: [] };
    return {
      alumnos: as.docs.map(d => ({ uid: d.id, ...d.data() })).sort((a, b) => (a.grupo || "").localeCompare(b.grupo || "", "es") || (a.nombre || "").localeCompare(b.nombre || "", "es")),
      roles: rs ? rs.docs.map(d => ({ correo: d.id, ...d.data() })) : [],
    };
  });
  if (!datos || estado.vista !== "staff-grupos") return;
  const { alumnos, roles } = datos;
  const grupos = estado.config.grupos || [];
  const todosGrupos = [...new Set([...grupos, ...alumnos.map(a => a.grupo)].filter(Boolean))];

  main.innerHTML = `
    <div class="encabezado"><div>
      <h1>${esAdmin ? "Grupos y usuarios" : "Grupos y alumnos"}</h1>
      <p>Los alumnos entran con su cuenta @${esc(DOMINIO_ALUMNOS)} y eligen su grupo la primera vez.</p>
    </div></div>

    <div class="tarjeta">
      <h2>Grupos</h2>
      <p style="margin:0 0 12px;font-size:14px;color:var(--gris-texto)">Estos son los grupos que el alumno puede elegir. Si no hay ninguno, el alumno escribe el suyo.</p>
      <ul class="lista-simple">${grupos.map((g, i) => `<li><span>${esc(g)}</span><button class="btn btn-suave btn-chico" data-quitar-g="${i}">Quitar</button></li>`).join("") || `<li style="color:var(--gris-texto)">Sin grupos definidos</li>`}</ul>
      <div class="en-linea"><input type="text" id="g-nuevo" maxlength="60" placeholder="Ej. Inglés A2 – Grupo 1"><button class="btn btn-rojo" id="g-agregar">Agregar grupo</button></div>
    </div>

    ${esAdmin ? `
    <div class="tarjeta">
      <h2>Profesoras y administradores</h2>
      <p style="margin:0 0 12px;font-size:14px;color:var(--gris-texto)">Solo estas cuentas ven el panel. Los admins de config.js (${ADMINS.map(esc).join(", ")}) siempre tienen acceso.</p>
      <ul class="lista-simple">${roles.map(r => `<li><span><b>${esc(r.nombre || r.correo)}</b> · ${esc(r.correo)} · <span class="chip ${r.rol === "admin" ? "rojo" : "gris"}">${r.rol === "admin" ? "Admin" : "Profesora"}</span></span>
        <button class="btn btn-suave btn-chico" data-quitar-r="${esc(r.correo)}">Quitar</button></li>`).join("") || `<li style="color:var(--gris-texto)">Aún no hay profesoras registradas</li>`}</ul>
      <div class="en-linea">
        <input type="text" id="r-nombre" placeholder="Nombre">
        <input type="email" id="r-correo" placeholder="correo@${esc(DOMINIO_ALUMNOS)}">
        <select id="r-rol" style="flex:0 0 150px"><option value="profesor">Profesora</option><option value="admin">Admin</option></select>
        <button class="btn btn-rojo" id="r-agregar">Agregar</button>
      </div>
    </div>` : ""}

    <div class="tarjeta">
      <h2>Alumnos registrados (${alumnos.length})</h2>
      ${alumnos.length ? `<div class="tabla-envoltura"><table class="tabla">
        <thead><tr><th>Alumno</th><th>Matrícula</th><th>Grupo</th></tr></thead>
        <tbody>${alumnos.map((a, i) => `<tr>
          <td><b>${esc(a.nombre)}</b><span class="sub">${esc(a.correo)}</span></td>
          <td>${esc(matricula(a.correo))}</td>
          <td><select data-alumno="${i}" style="min-width:180px">${[...new Set([a.grupo, ...todosGrupos])].filter(Boolean).map(g => `<option ${g === a.grupo ? "selected" : ""}>${esc(g)}</option>`).join("")}</select></td>
        </tr>`).join("")}</tbody></table></div>` : `<div class="vacio">Todavía no ha entrado ningún alumno.</div>`}
    </div>`;

  const guardarGrupos = async lista => {
    const r = await conError(() => setDoc(doc(db, "config", "general"), { grupos: lista }, { merge: true }));
    if (r !== undefined) { estado.config.grupos = lista; renderStaffGrupos(); }
  };
  $("#g-agregar").addEventListener("click", () => {
    const g = $("#g-nuevo").value.trim().replace(/\s+/g, " ");
    if (!g) return;
    if (grupos.includes(g)) return toast("Ese grupo ya existe");
    guardarGrupos([...grupos, g]);
  });
  $("#g-nuevo").addEventListener("keydown", e => { if (e.key === "Enter") $("#g-agregar").click(); });
  main.querySelectorAll("[data-quitar-g]").forEach(b => b.addEventListener("click", () =>
    guardarGrupos(grupos.filter((_, i) => i !== +b.dataset.quitarG))));

  main.querySelectorAll("[data-alumno]").forEach(s => s.addEventListener("change", async () => {
    const a = alumnos[+s.dataset.alumno];
    const r = await conError(() => updateDoc(doc(db, "alumnos", a.uid), { grupo: s.value }));
    if (r !== undefined) { a.grupo = s.value; toast(`${a.nombre} → ${s.value}`); }
  }));

  if (esAdmin) {
    $("#r-agregar").addEventListener("click", async () => {
      const correo = minus($("#r-correo").value);
      const nombre = $("#r-nombre").value.trim();
      const rol = $("#r-rol").value;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) return avisar("Correo inválido", "Escribe el correo completo de la profesora.");
      const r = await conError(() => setDoc(doc(db, "roles", correo), { rol, nombre, agregado: serverTimestamp() }));
      if (r !== undefined) { toast("Acceso agregado"); renderStaffGrupos(); }
    });
    main.querySelectorAll("[data-quitar-r]").forEach(b => b.addEventListener("click", async () => {
      const correo = b.dataset.quitarR;
      if (correo === minus(estado.user.email)) return avisar("No puedes quitarte a ti", "Pídele a otro admin que lo haga.");
      if (!await confirmar("¿Quitar acceso?", `${correo} ya no podrá entrar al panel.`, "Quitar")) return;
      const r = await conError(() => deleteDoc(doc(db, "roles", correo)));
      if (r !== undefined) { toast("Acceso quitado"); renderStaffGrupos(); }
    }));
  }
}
