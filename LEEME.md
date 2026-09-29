# Simulador de Comprensión Lectora · Idiomas UVM

Página estática en GitHub Pages que usa Firebase (Auth con Google + Firestore). No necesita servidor ni Cloud Functions, así que funciona en el plan gratuito (Spark).

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Estructura y estilos (formato UVM) |
| `app.js` | Toda la lógica: login, examen, panel de profesoras |
| `config.js` | **Configuración**: `firebaseConfig`, dominio de alumnos y correos admin |
| `firestore.rules` | Reglas de seguridad de la base de datos |
| `seed.js` | Las 6 lecturas del prototipo, para cargarlas con un botón |
| `firebase.json`, `.firebaserc` | Solo si algún día publicas con `firebase deploy` |

## Configuración inicial (una sola vez, ~10 min)

Todo se hace en https://console.firebase.google.com, en el proyecto **simulador-idiomas**.

1. **Activa el login con Google.** Ve a Authentication → Sign-in method → Google → Habilitar, elige el correo de asistencia y guarda.
2. **Autoriza el dominio de GitHub Pages.** En Authentication → Configuración → Dominios autorizados → Agregar dominio, escribe `leonardium.github.io`.
3. **Crea la base de datos.** En Firestore Database → Crear base de datos, elige **modo producción** y la ubicación `nam5 (us-central)`.
4. **Publica las reglas.** En Firestore Database → Reglas, borra lo que haya, pega todo `firestore.rules` y presiona Publicar.
5. **Copia la configuración web.** En ⚙ Configuración del proyecto → Tus apps → `</>` (App web), regístrala si no existe y copia el objeto `firebaseConfig` a `config.js`.
6. **Publica la página.** `git add . && git commit -m "..." && git push`. GitHub Pages la sirve en https://leonardium.github.io/SimuladorPrototipoIdiomas/

## Primer uso

1. Entra con un correo admin (definidos en `config.js` **y** en `firestore.rules`; deben coincidir).
2. En **Lecturas → Cargar lecturas de ejemplo** se suben las 6 lecturas, cerradas.
3. En **Grupos y usuarios**:
   - Agrega los grupos.
   - Agrega los correos de las profesoras (rol *Profesora*).
4. En **Lecturas**, presiona **Abrir** en las que deben ver los alumnos.

## Cómo funciona

- **Roles:**
  - Admins: los que están en `config.js` y `firestore.rules`, o los que agregues con rol *Admin*.
  - Profesoras: las registradas en *Grupos y usuarios*.
  - Alumnos: cualquier cuenta `@my.uvm.edu.mx` que no sea de las anteriores.
- **Alumno:** la primera vez escribe su nombre y elige su grupo. Tiene un solo intento por lectura. El reloj usa la hora del servidor, así que recargar la página o cambiar de computadora no lo reinicia. Sus respuestas se guardan solas y, si se acaba el tiempo, el intento se envía automáticamente.
- **Seguridad:**
  - Las respuestas correctas están en la colección `claves`. El alumno solo puede leerlas **después** de enviar su intento, y solo si la lectura tiene activado "Mostrar calificación".
  - El intento guarda únicamente las respuestas. La calificación se calcula contra la clave, así que no se puede falsificar.
  - Pasado el tiempo límite más 2 minutos de tolerancia, ya no se pueden cambiar respuestas.
- **Profesoras:**
  - Crean y editan lecturas. Las preguntas se pueden pegar desde Word con el importador.
  - Abren y cierran lecturas.
  - Ven resultados por grupo, con aciertos por pregunta.
  - Descargan un CSV que abre en Excel.
  - Pueden **reiniciar** el intento de un alumno para que lo presente otra vez.
  - Pueden corregir el grupo de un alumno.

## Formato del importador de preguntas

```
1. What is the main idea of the text?
a) Option one
b) Option two *
c) Option three
Habilidad: Main idea
Justificación: El párrafo 1 dice que…

2. According to paragraph 2, why…?
A. …
B. …
C. …
Respuesta: C
```

La correcta se marca con `*` al final de la opción o con una línea `Respuesta: X`. `Habilidad` y `Justificación` son opcionales.

## Si algo falla

- **"Este dominio no está autorizado":** falta el paso 2.
- **"No tienes permiso…":** las reglas no están publicadas (paso 4) o el correo admin no coincide entre `config.js` y `firestore.rules`.
- **La cuenta institucional no deja iniciar sesión** (aviso de "app no verificada" o "bloqueada por tu organización"): el Google Workspace de la UVM restringe apps externas. Hay que pedirle a TI que permita la app, o que la marquen como confiable.
