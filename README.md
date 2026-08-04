# Diario de Trekking — Parque Nacional Conguillío

Un diario de trekking interactivo con forma de corcho + mapa pinneado.
Registra senderos, calificaciones, reseñas, fotos y progreso en kilómetros.

## Estructura del proyecto

```
index.html      → la página (estructura/contenido)
style.css       → todo el diseño visual (colores, tamaños, posiciones)
script.js       → toda la lógica (los 30 senderos, guardado de progreso, fotos)
images/         → todas las imágenes que se pueden reemplazar
```

Todo el detalle de "cómo editar cada cosa" está explicado en comentarios
dentro de `style.css` y `script.js` — ábrelos y busca los bloques que
dicen `=====`, ahí están las instrucciones puntuales de cada sección.

## Publicarlo en GitHub Pages (gratis, sin usar la terminal)

1. Ve a https://github.com y crea una cuenta si no tienes una.
2. Arriba a la derecha, haz clic en el ícono **+** → **New repository**.
3. Ponle un nombre, por ejemplo `diario-conguillio`. Déjalo en **Public**.
   No marques ninguna otra opción. Haz clic en **Create repository**.
4. En la página del repositorio recién creado, haz clic en
   **"uploading an existing file"** (o en **Add file → Upload files**).
5. En tu computador, abre la carpeta del proyecto y arrastra **todo**
   (el archivo `index.html`, `style.css`, `script.js` y la carpeta
   `images` completa) hacia esa página. GitHub respeta la estructura de
   carpetas, así que `images/` se creará automáticamente.
6. Baja y haz clic en **Commit changes**.
7. Ve a la pestaña **Settings** del repositorio → en el menú de la
   izquierda busca **Pages**.
8. En "Branch", selecciona `main` y la carpeta `/root`, luego **Save**.
9. Espera 1-2 minutos y recarga la página. Arriba te va a aparecer un
   link tipo `https://tu-usuario.github.io/diario-conguillio/` — esa es
   tu página, ya publicada y funcionando para cualquiera con el link.

Cada vez que quieras cambiar algo, edita el archivo directamente en
GitHub (haz clic en el archivo → ícono de lápiz ✏️ → editas → **Commit
changes**), o reemplaza una imagen (entra a la carpeta `images` → clic
en el archivo → ícono de basurero para borrarlo → **Add file → Upload
files** para subir el nuevo con el mismo nombre). Los cambios se ven
reflejados en tu link en 1-2 minutos.

## Cómo mover, agachar o cambiar de tamaño un elemento

Todo el posicionamiento vive en `style.css`. La idea es simple:

- **top** = qué tan abajo está (0% = arriba del todo, 100% = abajo del todo)
- **left** = qué tan a la derecha está (0% = borde izquierdo, 100% = borde derecho)
- **width** = qué tan grande es (un % del ancho total de la pantalla)

Por ejemplo, para mover el sobre de fotos, busca en `style.css`:

```css
.envelope-wrap{ position:absolute; top:78%; left:75%; width:19%; ... }
```

Cambia `top:78%` a `top:60%` para subirlo, o `width:19%` a `width:25%`
para agrandarlo. Guarda, sube el archivo de nuevo a GitHub, y listo.

Los stickers (estrellas, montañita) se mueven directo en `index.html`,
en la línea donde dice `style="top:69%; left:62%;"`.

## Cómo reemplazar una imagen

No necesitas tocar código para esto. Solo:

1. Entra a la carpeta `images/` en GitHub (o en tu computador).
2. Sube tu imagen nueva **con exactamente el mismo nombre** que la que
   quieres reemplazar (por ejemplo, si quieres cambiar la estampilla
   de "primer paso", tu archivo nuevo debe llamarse `badge-first.svg`
   — o si usas una foto tuya, `.jpg` o `.png`, tendrías que además
   actualizar la extensión en `index.html`, buscando esa línea).
3. GitHub te preguntará si quieres reemplazar el archivo existente — di
   que sí, y confirma el commit.

### Qué imagen controla qué cosa

| Archivo                     | Qué es                                  |
|------------------------------|------------------------------------------|
| `cork-board.jpg`             | El fondo de corcho de toda la página    |
| `park-map.jpg`                | El mapa grande                          |
| `pin-marker.svg`              | La forma de los pines del mapa (el color lo controla el CSS, no la imagen) |
| `trekking-poles.svg`          | Los bastones de trekking, borde izquierdo |
| `postcard-1.svg` / `postcard-2.svg` | Las postales decorativas          |
| `sticker-star.svg`            | La estampilla de estrella               |
| `sticker-mountain.svg`        | La estampilla de montaña                |
| `envelope.svg`                | El sobre de fotos                       |
| `emblem.svg`                  | El ícono dentro del círculo del título  |
| `badge-first.svg`, `badge-10km.svg`, `badge-25km.svg`, `badge-half.svg`, `badge-volcanoes.svg`, `badge-all.svg` | Los íconos de cada insignia |

Si tu imagen de reemplazo tiene proporciones muy distintas a la
original, puede verse estirada — lo más simple es usar imágenes
cuadradas para los stickers/insignias, y horizontales para postales y
el sobre.

## Cómo agregar o quitar un sendero (pin en el mapa)

Todo vive en `script.js`, dentro del arreglo `TRAILS` al principio del
archivo. Cada sendero es un bloque así:

```js
{ id:'nombre-unico', name:'Nombre a mostrar', zone:'Sector', km:8, duration:'3 h', difficulty:'media',
  pin:{x:50, y:40},
  desc:'Descripción del sendero.',
  highlights:['Punto destacado 1','Punto destacado 2'] }
```

- `pin:{x,y}` son porcentajes sobre la imagen del mapa (`park-map.jpg`).
  x=0 es el borde izquierdo del mapa, x=100 el borde derecho; y=0 es
  arriba, y=100 abajo. Para ubicar un punto nuevo, abre
  `images/park-map.jpg` y estima a ojo en qué % está el lugar que
  quieres marcar.
- `difficulty` debe ser `'baja'`, `'media'` o `'alta'` (así se pinta el
  color del pin).

Para quitar un sendero, borra su bloque completo `{ ... }` del arreglo
(cuidado con las comas entre bloques).

## Fotos y almacenamiento

Las fotos que subas por el sobre se guardan en el navegador de quien
visite la página (no se suben a GitHub ni a ningún servidor). Eso
significa que si abres la página desde otro computador o navegador, no
vas a ver las fotos que subiste antes desde otro lugar — quedan
guardadas localmente donde las subiste.
