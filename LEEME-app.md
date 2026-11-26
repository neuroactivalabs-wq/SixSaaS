# SixSaaS PWA v0.3.0

## Publicar en Netlify (2 minutos)
1. Entra a app.netlify.com → "Add new site" → "Deploy manually".
2. Arrastra esta carpeta (o el .zip descomprimido). Listo: Netlify la sirve como sitio estático ($0).
3. Opcional: conecta tu dominio en "Domain management".

## Antes de lanzar, edita `js/config.js`
- `BUY_URLS`: pega el enlace de compra de cada módulo en EMP (mientras estén vacíos, la tarjeta dice "Disponible pronto").
- `MODULE_URLS`: URL de cada módulo cuando esté publicado.
- Cada vez que cambies archivos, sube también `VERSION` en `sw.js` para que los usuarios reciban la actualización.

## Estructura
- `js/optimizer.js` reglas de puntaje y generadores (sin IA, sin costo).
- `js/license.js` verificación de licencias firmadas (la clave privada NO está aquí).
- `js/store.js` modo "guardar" o "incógnito".
- `js/modules.js` catálogo de los 6 módulos Neuro.

## Novedades v0.3.0
- Academia (v0.5.0): 4 cursos de 12 lecciones (Google, Setter, Closer, Clientes que vuelven). Las primeras 4 de cada curso son gratis; la licencia `academia` ($4.99, pago único, generada en EMP) abre las 48. Las licencias de módulos Neuro NO abren la Academia (sí el Optimizador Full). Contenido en `js/academia.js` y `js/cursos/*.js`. Progreso por curso en `sxs:progreso` (clave `curso:n`; el avance antiguo se migra a `google:n`).
- Tarjeta "Pídeselo a Gemini" en los resultados y prompts personalizados (Full).
- Cada acción del optimizador enlaza a su lección.
