# simona-web

Sitio Next.js del proyecto SIMONA (agtech — kit IoT de monitoreo de cultivos).

Repo local: `~/Descargas/simona-web`. Rama `main`, se pushea a GitHub con un
personal access token del usuario `SaloWeb` (necesita scope `workflow` para
tocar archivos dentro de `.github/workflows/`).

Plan de mejoras funcional (features, seguridad, performance) vive aparte en
`~/Descargas/2/plan-mejoras-simona-web.md` — este README es sobre todo
**contexto de entorno + auditoría visual**, para que retomar el trabajo en
otro chat no implique repetir el diagnóstico desde cero.

---

## ⚠️ Limitación de hardware: sharp / next/image crashea

Esta netbook (BGH Positivo, Intel Atom N2600, **sin AVX2 ni SSE4.2**) hace
crashear al proceso de Next (`next dev` y `next start` por igual) con
`Illegal instruction (core dumped)` en cuanto el navegador pide una imagen
optimizada a través de `next/image` (ruta `/_next/image`). La librería
`sharp` usa instrucciones SIMD que este CPU no tiene.

Síntomas:
- `curl` a la página (`/`) anda perfecto (HTML plano, no toca `sharp`).
- Un navegador real (o Playwright) carga el HTML bien pero el server se cae
  silenciosamente al pedir las imágenes → la próxima request da
  `ERR_CONNECTION_REFUSED`.

**Workaround para poder navegar/screenshotear el sitio local:** agregar
temporalmente en `next.config.mjs`:

```js
images: { unoptimized: true },
```

rebuildear (`npm run build`) y levantar con `npm run start`. Con esto no
crashea. **Importante: revertir este cambio antes de commitear** — no es un
fix real, solo desactiva la optimización de imágenes para poder trabajar
localmente. El sitio en Vercel (con CPU normal) no tiene este problema.

## Cómo levantar el sitio local para inspección visual

`next dev` con Turbopack compila muy lento en este hardware (~60s la primera
carga de `/`). Es más confiable ir directo a producción:

```bash
cd ~/Descargas/simona-web
# 1. aplicar el workaround de arriba en next.config.mjs
npm run build      # ~2-4 min la primera vez, mucho menos con caché tibia
npm run start       # queda listo en ~2s, respondiendo en localhost:3000
# 2. revertir next.config.mjs cuando termines
```

## Playwright para capturas

Playwright (`npx playwright`, se instala on-demand, no es dependencia del
proyecto) + Chromium están disponibles. El script usado para las capturas
completas está en `/tmp/simona-shots/shoot.js` en esta máquina (fuera del
repo — `/tmp` se borra al reiniciar, así que si desaparece hay que
rehacerlo). Saca:
- Full-page de `/` en desktop (1440×900) y mobile (390×844)
- Una captura por cada `<section>` del home, en ambos viewports

Detalle importante: usar `waitUntil: 'domcontentloaded'` en `page.goto`, NO
`'load'` ni `'networkidle'` — el evento `load` nunca dispara porque algún
recurso externo (parece ser Google Fonts, que ya estaba anotado en el plan
de mejoras que da 403 en este tipo de entorno) queda colgado.

## Dónde están las capturas

`~/Descargas/simona-web/.claude-capturas/` (ignorado por git). 26 archivos:
`desktop-*.png` y `mobile-*.png`, uno `fullpage` y uno por sección
(`top`, `problema-solucion`, `sobre-nosotros`, `equipo`, `ia`, `comparativa`,
`simulador`, `perfiles`, `descargar`, `faq`, `contacto`).

---

## Auditoría visual — hallazgos (2026-09-08)

Revisión completa: 26 capturas (desktop 1440×900 + mobile 390×844, full-page
y por sección). **Auditoría de capturas terminada.** Falta: verificar cada
hallazgo abriendo el sitio real en un navegador (las capturas dan una muy
buena pista pero un par de hallazgos, marcados abajo, podrían ser artefacto
del método de captura y no un bug real) y después armar el plan de acción
priorizado con estimación de esfuerzo por ítem.

### Lo que está bien
- Hero: limpio, buena jerarquía tipográfica, tarjeta de datos del nodo IoT
  en vivo prolija. Se ve bien en desktop y mobile.
- Simulador interactivo: el punto más fuerte del sitio, bien resuelto,
  comunica bien la propuesta técnica. Anda bien en ambos viewports.
- Sección "Nosotros": buen storytelling (historia, misión/visión/valores,
  métricas).
- FAQ: acordeón funciona bien, sin problemas de layout en ningún viewport.
- Tabla comparativa (desktop) y su versión en tarjetas apiladas (mobile):
  contenido claro, columna SIMONA bien destacada.

### Problemas confirmados (alta confianza, se repiten en varias capturas)

1. **Título de sección tapado por la navbar sticky.** Confirmado en
   desktop ("Comparativa": "Matriz comparativa de mercado" queda
   parcialmente detrás del nav) y en mobile ("Problema y Solución":
   "...a la decisión informada" cortado; "Equipo": "...la escuela al
   campo" cortado; "Simulador": una línea del párrafo intro tapada).
   Es un problema de `scroll-margin-top` insuficiente en las secciones
   (o el nav no tiene suficiente z-index/la sección no tiene el padding-top
   que compense la altura del nav sticky). **Prioridad alta** — pasa en
   varias secciones y en ambos viewports, y afecta la primera impresión al
   navegar con anchors (ej. desde el menú).

2. **Contraste muy bajo en "Contacto"**: los títulos de las 3 tarjetas de
   la izquierda ("Invernaderos y quintas", "Escuelas y huertas",
   probablemente un tercero sobre programas comunitarios) son casi
   ilegibles — texto oscuro sobre fondo oscuro. Confirmado en desktop y
   mobile. **Prioridad alta** — es un problema de accesibilidad real, no
   solo estético, y estas tarjetas están al lado del formulario de
   contacto principal (B2B).

3. **Columnas desparejas con espacio en blanco muerto** (desktop). Aparece
   en "Problema y Solución" (tarjeta de texto vs. foto), "Nosotros"
   (columna Misión/Visión/Valores vs. imagen+Historia) y "Perfiles"
   (mockup de celular vs. columna de texto). Ver si conviene igualar
   alturas de columna (`items-stretch` / `h-full`) o redistribuir
   contenido. **Prioridad media** — es estético, no rompe nada.

4. **Equipo**: avatares de los integrantes son solo iniciales sobre fondo
   de color, sin fotos — dan sensación de placeholder. **Prioridad baja.**

### A verificar en navegador real (posible artefacto de la captura, no confirmado)

5. En varias secciones altas (mobile: "Nosotros", "Equipo", "IA",
   "Comparativa", "Descargar app", "Perfiles") las capturas muestran un
   espacio en blanco/vacío muy grande antes de que arranque el contenido
   visible, y en dos de ellas ("IA", "Comparativa") el título de la
   sección no aparece en la imagen. Esto puede ser un bug real de
   padding-top excesivo en mobile, o puede ser un artefacto del método de
   captura (`elementHandle.screenshot()` sobre secciones mucho más altas
   que el viewport). **No tratar como confirmado** hasta abrir esas
   secciones en un navegador/devtools mobile real y confirmar si el
   espacio en blanco existe de verdad.

6. Dentro del mockup de celular en "Perfiles" (mobile) hay un hueco blanco
   grande entre los sliders y el botón "Guardar y continuar" — a
   confirmar si es real o efecto del punto 5.

### Próximo paso al retomar
Con el sitio local levantado (ver instrucciones arriba), entrar manualmente
desde el navegador a cada sección marcada en el punto 5 y confirmar/descartar.
Después armar el plan de acción con los ítems 1-4 (confirmados) más lo que
se confirme del punto 5-6, priorizado por impacto/esfuerzo, siguiendo el
mismo formato que `~/Descargas/2/plan-mejoras-simona-web.md`.
