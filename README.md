# Skymo Helados — Landing Page

Landing page de una sola página para **Skymo Helados** (heladería y paletería artesanal, Sucursal Las Granjas).

HTML + CSS + JavaScript puros, sin dependencias ni proceso de build. Lista para desplegar tal cual.

## Cómo verla

Abre `index.html` en el navegador, o sirve la carpeta localmente:

```bash
npx serve .
```

## Cómo desplegarla

- **Netlify:** arrastra la carpeta completa a [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel:** `npx vercel` desde esta carpeta.
- **Cualquier hosting estático:** sube todos los archivos tal cual.

## Qué reemplazar antes de publicar

| Qué | Dónde | Cómo |
|---|---|---|
| Número de WhatsApp | `index.html` (3 lugares: botón flotante, sección "¡Gracias!" y footer) | Busca `52XXXXXXXXXX` y pon el número real con lada, ej. `wa.me/528441234567` |
| Links de Facebook e Instagram | `index.html` (sección "¡Gracias!" y footer) | Busca `href="#"` junto a los íconos de redes y pega las URLs reales |
| Fotos de la galería | `index.html`, sección "Muro de sonrisas" | Cada `<figure class="carrusel__item carrusel__item--placeholder">...</figure>` se reemplaza por `<img class="carrusel__item" src="assets/fotos/mi-foto.jpg" alt="Descripción de la foto">`. Recomendado: fotos de 800×900 px aprox. |
| Textos | `index.html` | Todo el copy está en español y es editable directamente |

## Nota sobre los assets

- `assets/logo.png` originalmente era un archivo **AVIF renombrado a .png**; se convirtió a PNG real para máxima compatibilidad. El original se conserva como `assets/logo-original.avif`.
- El logo tiene **fondo blanco** (no transparente), por eso el sitio lo presenta dentro de "chips" blancos redondeados estilo sticker. Si algún día consigues el logo con fondo transparente, reemplaza `assets/logo.png` y elimina las reglas `background: #FFFFFF` de `.header__logo img`, `.hero__logo` y `.footer__marca img` en `css/styles.css`.
- `assets/mascota.png` es una **foto vertical del osito en la tienda** (768×960), por eso se muestra con marco blanco estilo polaroid. Si consigues un PNG recortado de la mascota sin fondo, reemplázala y quita `border` y `border-radius` de `.hero__mascota img` y `.gracias__mascota img`.

## Estructura

```
skymos/
├── index.html        # Toda la página (7 secciones)
├── favicon.svg       # Paleta roja de Skymo
├── css/
│   └── styles.css    # Estilos y animaciones (comentados en español)
├── js/
│   └── main.js       # Scroll-reveal, header, menú móvil, carrusel, badge de horario
└── assets/
    ├── logo.png             # Logo (PNG real, convertido desde AVIF)
    ├── logo-original.avif   # Respaldo del archivo original
    └── mascota.png          # Foto del osito en la tienda
```

## Detalles técnicos

- **Mobile-first y responsive** (breakpoints en 480, 768 px).
- **Animaciones** con CSS + IntersectionObserver (sin librerías). Todas se desactivan si el sistema tiene activado "reducir movimiento" (`prefers-reduced-motion`).
- **Badge de horario inteligente:** muestra "¡Abierto ahora!" entre 12 pm y 9 pm, y "Hoy abrimos 12 pm" fuera de ese horario.
- **SEO:** meta description, Open Graph y título configurados en el `<head>` de `index.html`.
- Los íconos de redes sociales se cargan desde `cdn.simpleicons.org`; si prefieres no depender del CDN, descárgalos y guárdalos en `assets/`.
