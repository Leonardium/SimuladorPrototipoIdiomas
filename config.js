/* =====================================================================
   CONFIGURACIÓN DEL SIMULADOR
   ---------------------------------------------------------------------
   1) firebaseConfig: cópialo de Firebase console →
      Configuración del proyecto → Tus apps → App web → "Configuración del SDK".
      Estos valores NO son secretos (van en cualquier página que use Firebase);
      la seguridad la ponen las reglas de firestore.rules.
   2) DOMINIO_ALUMNOS: cualquier cuenta de este dominio entra como alumno.
   3) ADMINS: correos con permisos de administrador desde el primer día.
      Deben coincidir con la lista ADMINS de firestore.rules.
   ===================================================================== */

export const firebaseConfig = {
  apiKey: "AIzaSyA1s1el6hR8ydtH_df7rRRtSbJN_Kdtkfk",
  authDomain: "simulador-idiomas.firebaseapp.com",
  projectId: "simulador-idiomas",
  storageBucket: "simulador-idiomas.firebasestorage.app",
  messagingSenderId: "663632559992",
  appId: "1:663632559992:web:b7b1f9fb972dad0868528d"
};

export const DOMINIO_ALUMNOS = "my.uvm.edu.mx";

export const ADMINS = [
  "guillermo_penaq@my.uvm.edu.mx",
  "leonardo.peq13@gmail.com"
];

/* Cuentas fuera del dominio que entran como ALUMNO, para pruebas.
   Deben coincidir con ALUMNOS_PRUEBA de firestore.rules. */
export const ALUMNOS_PRUEBA = [
  "leonardium15313@gmail.com"
];

/* Calificación mínima aprobatoria (%) */
export const APROBATORIA = 70;

/* Nombre que aparece al pie del login */
export const AUTOR = "G. Leonardo Peña Quintal";
