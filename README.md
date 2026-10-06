# SICA · Sistema de Inventario de Centros de Apoyo

Sitio web + aplicación del prototipo **SICA** (plataforma unificada para control de inventarios,
recepción de donaciones, registro y caracterización de beneficiarios —SIGA—, priorización de
solicitudes —Resilia— y despacho trazable de cargas humanitarias).

Construido como **sitio estático multipágina sin dependencias de runtime**: HTML + CSS + JS vanilla.
Se abre con doble clic y se publica tal cual en GitHub Pages, Netlify o Vercel.

---

## 1. Cómo ejecutarlo

| Opción | Comando / paso |
|---|---|
| Doble clic | Abrir `index.html` en cualquier navegador moderno |
| Servidor local | `python3 -m http.server 8000` dentro de `sica-web/` → `http://localhost:8000` |
| Netlify / Vercel | Arrastrar la carpeta `sica-web/` al dashboard (sin build step) |
| GitHub Pages | Subir la carpeta como raíz del repo → Settings → Pages |

### Credenciales de demostración (contraseña `sica2026`)

| Correo | Rol | Permisos |
|---|---|---|
| `admin@sica.org` | Administradora | Todo |
| `inventario@sica.org` | Encargado de inventario | Gestión y despacho |
| `bodega@sica.org` | Personal de bodega | Despacho (preparar/confirmar) |
| `conductor@sica.org` | Conductor | Despacho (confirmar salida) |
| `donante@sica.org` | Organismo donante | Solo lectura (RF-10) |

Los datos son simulados y persisten en `localStorage`; para restablecer la semilla:
clic en el tarjeta de usuario (sidebar) → aceptar, o borrar el almacenamiento del sitio.

---

## 2. Estructura

```
sica-web/
├── index.html              Landing pública (SEO completo, demo interactiva del flujo CU-03)
├── login.html              Autenticación por roles (RF-10)
├── robots.txt · sitemap.xml · site.webmanifest
├── app/
│   ├── index.html          Módulo 1 · Panel de control (RF-01)
│   ├── centros.html        Módulo 2 · Centros de apoyo (RF-02)
│   ├── inventario.html     Módulo 3 · Inventario con umbrales (RF-03)
│   ├── donaciones.html     Módulo 4 · Donaciones / Entradas (RF-04)
│   ├── distribucion.html   Módulo 5 · Distribución / Salidas (RF-05, RF-06)
│   ├── beneficiarios.html  Módulo 6 · Padrón SIGA (RF-07)
│   ├── priorizacion.html   Módulo 7 · Matriz Resilia (RF-08)
│   └── reportes.html       Módulo 8 · Reportes y exportaciones (RF-09)
└── assets/
    ├── css/  base.css (design system) · landing.css · app.css
    ├── js/   data.js (BD simulada + Resilia) · app.js (shell y módulos) · landing.js
    └── img/  logo.svg · favicon.svg · og-image.png
```

---

## 3. Sistema de diseño — “Cristal ahumado”

Investigado sobre tendencias UI 2025-2026 (glassmorphism 2.0 / liquid glass, teardowns de
Linear, Vercel y Stripe) y aplicado con receta de **vidrio real**, no rectángulos grises:

1. **Fondo ahumado profundo** `#06080b` con auroras teal/cyan/azul desenfocadas (`blur(110px)`),
   que dan al vidrio algo que refractar.
2. **`backdrop-filter: blur(22px) saturate(170%)`** — el `saturate()` es la clave: sin él el
   blur “lava” el color y el panel parece plástico sucio, no cristal.
3. **Bisel pulido**: anillo de 1 px con gradiente de luz recortado con `mask-composite: exclude`
   (`.glass-rim`) + highlight interior `inset 0 1px 0 rgba(255,255,255,.14)`.
4. **Grano de cristal**: textura de ruido SVG (`feTurbulence`) al 3 % en `mix-blend-mode: overlay`.
5. **Profundidad por capas**: sombras largas negras + micro-sombra interior inferior.
6. **Movimiento**: sheen especular que barre las tarjetas al hover, reveal on scroll con
   `IntersectionObserver`, contadores animados y `prefers-reduced-motion` respetado.

Paleta: tinta blanca escalonada (94/66/44/28 %), acento teal→cyan `#2DD4BF→#22D3EE`,
semánticos de urgencia Resilia (ALTA rosa, MEDIA ámbar, BAJA esmeralda).
Tipografías: **Inter** (UI, tracking −0.02/−0.035 em) + **JetBrains Mono** (códigos y números).

---

## 4. SEO implementado

- `<title>` y `meta description` únicos por página; `lang="es"`; `canonical`; `hreflang`.
- Open Graph + Twitter Cards con `og-image.png` (1024×1024) y alt de imagen.
- **JSON-LD**: `WebSite`, `Organization` (equipo), `SoftwareApplication` con `featureList`.
- HTML semántico: `header/nav/main/section/article/footer`, un solo `h1` por página,
  jerarquía de encabezados correcta, `aria-label` en navs, tablas y gráficas SVG.
- `robots.txt` (bloquea `/app/` y `/login.html`) + `sitemap.xml` (solo la landing pública);
  páginas internas con `meta robots noindex`.
- Accesibilidad: skip-link, `:focus-visible`, contraste WCAG AA sobre vidrio, formularios con
  `label` explícito, `role="tablist"/"dialog"/"status"`, `prefers-reduced-motion`.
- Rendimiento: cero librerías externas de JS, gráficas SVG inline, `preconnect` de fuentes,
  `display=swap`, imagen del hero con `preload`.

---

## 5. Funcionalidad del prototipo (mapeo a requisitos)

| Req | Implementación |
|---|---|
| RF-01 | Dashboard con KPIs, alertas de umbral, actividad 7 días y capacidad por centro |
| RF-02 | CRUD de centros con capacidad/ocupación y responsable |
| RF-03 | Inventario filtrable (centro/tipo/estado/búsqueda) con barras de nivel y pills ÓPTIMO/BAJO/CRÍTICO |
| RF-04 | Formulario de entrada que actualiza existencias y traza el movimiento con referencia de origen |
| RF-05 | Lista de carga desde solicitudes confirmadas + notificación simulada a bodega/conducción |
| RF-06 | Flujo Preparando → En ruta → Entregado con descuento de stock al confirmar salida |
| RF-07 | Padrón SIGA con ficha, filtros, vulnerabilidad y solicitudes asociadas |
| RF-08 | Matriz urgencia×criticidad 3×3 + puntaje expuesto (0,35·magnitud + 0,25·vulnerabilidad + 0,25·esencialidad + 0,15·tiempo) y confirmación humana |
| RF-09 | Reportes por rango/centro/tipo con exportación **CSV real** (Excel) y **PDF** vía impresión |
| RF-10 | Sesión por roles; botones de escritura ocultos según perfil; donante en modo consulta |

Flujo alternativo CU-03 (stock insuficiente) implementado: el modal de despacho muestra el
déficit y advierte antes de autorizar la salida. Empates de Resilia se resuelven por fecha (CU-02).

---

## 6. Pruebas

Smoke test headless (jsdom) sobre las 10 páginas + suite de flujos:
donación→stock, confirmación Resilia, despacho→descuento→trazabilidad y reportes.
Resultado: **10/10 páginas y 11/11 flujos en verde**.

## 7. Equipo

Cesar Alberto Grain Agudelo · Sarly Samira Naranjo Tello · Jhon Leyner Orobio Paredes
Universidad del Pacífico — Ingeniería de Sistemas, Buenaventura · 2026
Docente: Daniel Hurtado Bustos · Metodología RUP · Notación UML 2.5
