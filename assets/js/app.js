/* ============================================================
   SICA · App shell + módulos (JS vanilla, sin dependencias)
   ============================================================ */
(function () {
  "use strict";
  const { db } = window.SICA;

  /* ---------- Iconos (stroke, 24px) ---------- */
  const P = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    arrowUp: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    arrowDown: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    chart: '<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>',
    layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'
  };
  const ic = (n, cls) => `<svg class="ic ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

  /* ---------- utils ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const nf = new Intl.NumberFormat("es-CO");
  const fmt = (n) => nf.format(n);
  const fdate = (iso) => new Date(iso + (iso.length === 10 ? "T12:00:00" : "")).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
  const ftime = (iso) => { const d = new Date(iso); const h = Math.round((Date.now() - d) / 36e5); if (h < 1) return "hace minutos"; if (h < 24) return `hace ${h} h`; return `hace ${Math.round(h / 24)} d`; };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const user = window.SICA.session.get();
  if (!user) { location.replace("../login.html"); return; }

  const ROLES_GESTION = ["Encargado de inventario", "Administradora"];
  const ROLES_DESPACHO = ["Encargado de inventario", "Administradora", "Personal de bodega", "Conductor"];
  const canGestion = ROLES_GESTION.includes(user.rol);
  const canDespacho = ROLES_DESPACHO.includes(user.rol);
  const soloLectura = user.rol === "Organismo donante";

  /* ---------- Shell ---------- */
  const NAV = [
    { g: "Operación" },
    { id: "dashboard", href: "index.html", icon: "grid", label: "Panel de control" },
    { id: "inventario", href: "inventario.html", icon: "box", label: "Inventario" },
    { id: "donaciones", href: "donaciones.html", icon: "inbox", label: "Donaciones / Entradas" },
    { id: "distribucion", href: "distribucion.html", icon: "truck", label: "Distribución / Salidas" },
    { g: "Población" },
    { id: "beneficiarios", href: "beneficiarios.html", icon: "users", label: "Beneficiarios · SIGA" },
    { id: "priorizacion", href: "priorizacion.html", icon: "gauge", label: "Priorización · Resilia" },
    { g: "Administración" },
    { id: "centros", href: "centros.html", icon: "pin", label: "Centros de apoyo" },
    { id: "reportes", href: "reportes.html", icon: "file", label: "Reportes" }
  ];
  const TITLES = {
    dashboard: ["Panel de control", "Visión global de existencias, alertas y actividad operativa en tiempo real."],
    centros: ["Centros de apoyo", "Sedes y puntos de acopio: ubicación, capacidad instalada y responsable."],
    inventario: ["Inventario", "Existencias por centro y tipo de insumo con alertas de umbral mínimo."],
    donaciones: ["Donaciones / Entradas", "Registro de ingresos de insumos con actualización inmediata del inventario."],
    distribucion: ["Distribución / Salidas", "Listas de carga, notificación a bodega y conducción, y confirmación de salida."],
    beneficiarios: ["Beneficiarios · SIGA", "Padrón caracterizado de personas y comunidades receptoras de la ayuda."],
    priorizacion: ["Priorización · Resilia", "Matriz de urgencia y criticidad con clasificación automática y confirmación humana."],
    reportes: ["Reportes", "Trazabilidad e indicadores de gestión con exportación PDF y Excel (CSV)."]
  };

  function buildShell() {
    const page = document.body.dataset.page;
    const nAlertas = window.SICA.alertas().length;
    const aside = document.createElement("aside");
    aside.className = "sidebar";
    aside.id = "sidebar";
    aside.innerHTML = `
      <a class="side-logo" href="../index.html" aria-label="SICA — ir al sitio público">
        <svg viewBox="0 0 128 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SICA">
          <defs><linearGradient id="lgs" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5EEAD4"/><stop offset=".5" stop-color="#2DD4BF"/><stop offset="1" stop-color="#22D3EE"/></linearGradient></defs>
          <path d="M16 1.5 L29 8.5 V23.5 L16 30.5 L3 23.5 V8.5 Z" fill="url(#lgs)" fill-opacity=".14" stroke="url(#lgs)" stroke-width="1.6" stroke-linejoin="round"/>
          <path d="M16 1.5 L16 30.5 M3 8.5 L16 15.8 L29 8.5" stroke="url(#lgs)" stroke-width="1.1" stroke-opacity=".55" fill="none"/>
          <circle cx="16" cy="15.8" r="2.1" fill="#5EEAD4"/>
          <text x="38" y="21.6" font-family="Inter,'Segoe UI',system-ui,sans-serif" font-size="15" font-weight="700" letter-spacing=".14em" fill="#F4FAF9">SICA</text>
        </svg>
      </a>
      <nav class="side-nav" aria-label="Módulos del sistema">
        ${NAV.map((n) => n.g
          ? `<span class="side-group">${n.g}</span>`
          : `<a class="side-link" href="${n.href}" ${n.id === page ? 'aria-current="page"' : ""}>${ic(n.icon)}<span>${n.label}</span>${n.id === "inventario" && nAlertas ? `<span class="badge-count">${nAlertas}</span>` : ""}</a>`).join("")}
      </nav>
      <div class="side-foot">
        <button class="side-user" id="userBtn" aria-haspopup="true">
          <span class="avatar-sm">${esc(user.iniciales)}</span>
          <span style="min-width:0"><b>${esc(user.nombre)}</b><span>${esc(user.rol)}</span></span>
        </button>
      </div>`;
    document.body.prepend(aside);

    const main = $(".main");
    const top = document.createElement("header");
    top.className = "topbar";
    top.innerHTML = `
      <button class="iconbtn hamb" id="hamb" aria-label="Abrir menú">${ic("menu")}</button>
      <div class="crumb"><span>SICA</span><span aria-hidden="true">/</span><b>${TITLES[page][0].split(" · ")[0]}</b></div>
      <div class="topbar-spacer"></div>
      <div class="searchbox">${ic("search")}<input type="search" class="input" placeholder="Buscar…  (Ctrl K)" aria-label="Buscar en el sistema" id="globalSearch"></div>
      <div style="position:relative">
        <button class="iconbtn" id="bellBtn" aria-label="Notificaciones" aria-haspopup="true">${ic("bell")}${db.notificaciones.length ? '<span class="ndot"></span>' : ""}</button>
        <div class="notif-pop glass" id="notifPop" role="menu" aria-label="Notificaciones">
          <div class="notif-head"><span>Notificaciones</span><button class="btn btn-subtle btn-xs" id="clearNotif">Limpiar</button></div>
          ${db.notificaciones.slice(0, 6).map((n) => `<div class="notif-item">${ic(n.tipo === "err" ? "alert" : n.tipo === "warn" ? "clock" : "check")}<div><p>${esc(n.texto)}</p><time>${ftime(n.tiempo)}</time></div></div>`).join("") || '<div class="empty"><p>Sin notificaciones.</p></div>'}
        </div>
      </div>
      <button class="iconbtn" id="exitBtn" aria-label="Cerrar sesión y volver al sitio">${ic("logout")}</button>`;
    main.prepend(top);

    /* head de página */
    const head = document.createElement("div");
    head.className = "page-head";
    head.innerHTML = `<div><h1>${TITLES[page][0]}</h1><p>${TITLES[page][1]}</p></div><div class="page-actions" id="pageActions"></div>`;
    $("#contenido").prepend(head);

    /* interacciones shell */
    $("#hamb").addEventListener("click", () => document.body.classList.toggle("side-open"));
    $("#scrim").addEventListener("click", () => document.body.classList.remove("side-open"));
    $("#bellBtn").addEventListener("click", (e) => { e.stopPropagation(); $("#notifPop").classList.toggle("open"); });
    document.addEventListener("click", (e) => { if (!e.target.closest("#notifPop")) $("#notifPop").classList.remove("open"); });
    $("#clearNotif").addEventListener("click", () => { db.notificaciones = []; window.SICA.save(); location.reload(); });
    $("#exitBtn").addEventListener("click", () => { window.SICA.session.clear(); location.replace("../login.html"); });
    $("#userBtn").addEventListener("click", () => {
      if (confirm(`Sesión: ${user.nombre} · ${user.rol}\n\n¿Restablecer los datos de demostración del prototipo?`)) {
        window.SICA.reset(); location.reload();
      }
    });
    $("#globalSearch").addEventListener("keydown", (e) => {
      if (e.key === "Enter") { const q = e.target.value.trim(); if (q) toast(`Búsqueda global «${q}» disponible en la versión de producción.`, "warn"); }
    });
    document.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#globalSearch").focus(); } });
  }

  /* ---------- toast / modal ---------- */
  function toast(msg, tipo) {
    tipo = tipo || "ok";
    const t = document.createElement("div");
    t.className = "toast toast-" + tipo;
    t.setAttribute("role", "status");
    t.innerHTML = ic(tipo === "ok" ? "check" : tipo === "warn" ? "clock" : "alert") + `<span>${esc(msg)}</span>`;
    $("#toasts").appendChild(t);
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 220); }, 4200);
  }
  function openModal(html) {
    const m = $("#modal");
    m.innerHTML = `<div class="modal glass glass-rim" role="dialog" aria-modal="true">${html}</div>`;
    m.classList.add("open");
    m.addEventListener("click", (e) => { if (e.target === m) closeModal(); });
    document.addEventListener("keydown", function h(e) { if (e.key === "Escape") { closeModal(); document.removeEventListener("keydown", h); } });
    const f = m.querySelector("input,select,textarea,button"); if (f) f.focus();
  }
  function closeModal() { $("#modal").classList.remove("open"); $("#modal").innerHTML = ""; }
  window.toast = toast; window.openModal = openModal; window.closeModal = closeModal;

  /* ---------- charts SVG ---------- */
  function barChart(values, labels, h) {
    h = h || 150;
    const w = 560, pad = 26, bw = (w - pad * 2) / values.length;
    const max = Math.max(...values, 1);
    return `<svg class="chart" viewBox="0 0 ${w} ${h + 26}" role="img" aria-label="Gráfica de barras">
      <defs><linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5EEAD4"/><stop offset="1" stop-color="#0D9488" stop-opacity=".35"/></linearGradient></defs>
      ${[0.25, 0.5, 0.75, 1].map((f) => `<line class="gridline" x1="${pad}" x2="${w - pad}" y1="${h - h * f + 8}" y2="${h - h * f + 8}"/>`).join("")}
      ${values.map((v, i) => {
        const bh = Math.max(3, (v / max) * (h - 14));
        return `<g><rect class="bar" x="${pad + i * bw + bw * 0.22}" y="${h - bh + 8}" width="${bw * 0.56}" height="${bh}" rx="6" fill="url(#gb)"/>
        <text class="axis" x="${pad + i * bw + bw / 2}" y="${h + 22}" text-anchor="middle">${esc(labels[i])}</text>
        <text class="axis" x="${pad + i * bw + bw / 2}" y="${h - bh + 1}" text-anchor="middle" fill="rgba(244,250,249,.75)">${fmt(v)}</text></g>`;
      }).join("")}
    </svg>`;
  }
  function areaChart(seriesA, seriesB, labels, h) {
    h = h || 150;
    const w = 560, pad = 30;
    const max = Math.max(...seriesA, ...seriesB, 1);
    const X = (i) => pad + (i * (w - pad * 2)) / (labels.length - 1);
    const Y = (v) => h - (v / max) * (h - 18) + 8;
    const path = (s) => s.map((v, i) => `${i ? "L" : "M"}${X(i)},${Y(v)}`).join(" ");
    const area = (s) => path(s) + ` L${X(s.length - 1)},${h + 8} L${X(0)},${h + 8} Z`;
    return `<svg class="chart" viewBox="0 0 ${w} ${h + 26}" role="img" aria-label="Gráfica de actividad">
      <defs>
        <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2DD4BF" stop-opacity=".34"/><stop offset="1" stop-color="#2DD4BF" stop-opacity="0"/></linearGradient>
        <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60A5FA" stop-opacity=".28"/><stop offset="1" stop-color="#60A5FA" stop-opacity="0"/></linearGradient>
      </defs>
      ${[0.25, 0.5, 0.75, 1].map((f) => `<line class="gridline" x1="${pad}" x2="${w - pad}" y1="${h - h * f + 8}" y2="${h - h * f + 8}"/>`).join("")}
      <path d="${area(seriesA)}" fill="url(#ga)"/><path d="${path(seriesA)}" fill="none" stroke="#2DD4BF" stroke-width="2" stroke-linecap="round"/>
      <path d="${area(seriesB)}" fill="url(#gc)"/><path d="${path(seriesB)}" fill="none" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4 4" stroke-linecap="round"/>
      ${labels.map((l, i) => `<text class="axis" x="${X(i)}" y="${h + 22}" text-anchor="middle">${l}</text>`).join("")}
    </svg>`;
  }
  function sparkline(vals, color) {
    const w = 84, h = 30, max = Math.max(...vals, 1);
    const pts = vals.map((v, i) => `${(i * w) / (vals.length - 1)},${h - (v / max) * (h - 4) - 2}`).join(" ");
    return `<svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/></svg>`;
  }

  /* ---------- CSV export ---------- */
  function exportCSV(filename, rows) {
    const csv = rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 800);
    toast(`Exportado: ${filename}`, "ok");
  }
  window.exportCSV = exportCSV;

  /* ---------- helpers de render ---------- */
  const nivelPill = (n) => `<span class="pill ${n === "ALTA" ? "pill-danger" : n === "MEDIA" ? "pill-warn" : "pill-ok"}"><span class="dot"></span>${n}</span>`;
  const estadoPill = (e) => ({ "Pendiente": "pill-warn", "Confirmada": "pill-info", "En despacho": "pill-brand", "Preparando": "pill-warn", "En ruta": "pill-info", "Entregado": "pill-ok" }[e] || "pill-neutral");
  window.SICA_UI = { ic, fmt, fdate, ftime, esc, barChart, areaChart, sparkline, nivelPill, estadoPill, canGestion, canDespacho, soloLectura, user };

  /* ============================================================
     MÓDULOS
     ============================================================ */
  const page = document.body.dataset.page;
  const renderers = {

    /* ---------- 1. Dashboard ---------- */
    dashboard() {
      const totalUnidades = db.existencias.reduce((a, e) => a + e.stock, 0);
      const alertas = window.SICA.alertas();
      const pend = db.solicitudes.filter((s) => s.estado === "Pendiente" || s.estado === "Confirmada");
      const despMes = db.despachos.filter((d) => d.fecha >= new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10));
      const unidadesDesp = despMes.reduce((a, d) => a + d.items.reduce((x, i) => x + i.cantidad, 0), 0);

      $("#pageActions").innerHTML = soloLectura ? `<span class="pill pill-neutral">${ic("eye")} Modo consulta</span>` : `<button class="btn btn-ghost btn-sm" onclick="location.reload()">${ic("refresh")} Actualizar</button>`;

      /* actividad últimos 7 días */
      const days = [...Array(7)].map((_, i) => new Date(Date.now() - (6 - i) * 864e5).toISOString().slice(0, 10));
      const ent = days.map((d) => db.movimientos.filter((m) => m.tipo === "Entrada" && m.fecha === d).reduce((a, m) => a + m.cantidad, 0));
      const sal = days.map((d) => db.movimientos.filter((m) => m.tipo === "Salida" && m.fecha === d).reduce((a, m) => a + m.cantidad, 0));
      const lbl = days.map((d) => new Date(d + "T12:00:00").toLocaleDateString("es-CO", { weekday: "short" }));

      const porCentro = db.centros.map((c) => db.existencias.filter((e) => e.centro === c.id).reduce((a, e) => a + e.stock, 0));

      $("#contenido").insertAdjacentHTML("beforeend", `
        <section class="kpis" aria-label="Indicadores principales">
          <article class="kpi glass"><div class="top"><span class="label">Unidades disponibles</span>${ic("box")}</div>
            <div class="value">${fmt(totalUnidades)}</div><span class="delta up">${ic("arrowUp")} 12,4 % vs. mes anterior</span>
            ${sparkline([4200, 4600, 4400, 5100, 5600, 6100, totalUnidades], "#2DD4BF")}</article>
          <article class="kpi glass"><div class="top"><span class="label">Alertas de umbral</span>${ic("alert")}</div>
            <div class="value" style="color:${alertas.length ? "var(--warn-400)" : "inherit"}">${alertas.length}</div><span class="delta ${alertas.length ? "down" : "up"}">${alertas.length ? "Requieren revisión" : "Todo en orden"}</span></article>
          <article class="kpi glass"><div class="top"><span class="label">Solicitudes activas</span>${ic("gauge")}</div>
            <div class="value">${pend.length}</div><span class="delta up">${db.solicitudes.filter((s) => window.SICA.resilia(s).nivel === "ALTA" && s.estado !== "Entregado").length} en nivel ALTA</span>
            ${sparkline([2, 3, 3, 4, 3, 5, pend.length], "#60A5FA")}</article>
          <article class="kpi glass"><div class="top"><span class="label">Despachos (30 d)</span>${ic("truck")}</div>
            <div class="value">${despMes.length}</div><span class="delta up">${fmt(unidadesDesp)} unidades entregadas</span></article>
        </section>

        <section class="grid-2">
          <article class="panel glass">
            <div class="panel-head"><div><h2>Actividad de inventario · 7 días</h2><div class="sub">Entradas y salidas consolidadas de los tres centros</div></div>
              <div class="legend"><span><i style="background:#2DD4BF"></i>Entradas</span><span><i style="background:#60A5FA"></i>Salidas</span></div></div>
            ${areaChart(ent, sal, lbl)}
          </article>
          <article class="panel glass">
            <div class="panel-head"><div><h2>Alertas activas</h2><div class="sub">Existencias en o bajo el umbral mínimo</div></div></div>
            ${alertas.length ? `<div class="req-list">${alertas.map((a) => `
              <div class="req-card glass-sm"><div><div class="t">${esc(a.insumoObj.nombre)}</div>
                <div class="meta"><span>${esc(a.centroObj.nombre)}</span><span class="mono">${fmt(a.stock)} / umbral ${fmt(a.umbral)}</span></div></div>
                ${a.stock <= a.umbral * 0.9 ? '<span class="pill pill-danger"><span class="dot"></span>CRÍTICO</span>' : '<span class="pill pill-warn"><span class="dot"></span>BAJO</span>'}</div>`).join("")}</div>`
              : `<div class="empty">${ic("check")}<p>Sin alertas: todas las existencias sobre el umbral.</p></div>`}
          </article>
        </section>

        <section class="grid-2">
          <article class="panel glass">
            <div class="panel-head"><div><h2>Movimientos recientes</h2><div class="sub">Trazabilidad fechada de entradas y salidas</div></div>
              <a class="btn btn-subtle btn-sm" href="reportes.html">Ver reportes</a></div>
            <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Movimiento</th><th>Tipo</th><th>Centro</th><th>Insumo</th><th style="text-align:right">Cant.</th><th>Fecha</th></tr></thead><tbody>
              ${db.movimientos.slice(0, 6).map((m) => `<tr><td class="mono small">${m.id}</td><td><span class="pill ${m.tipo === "Entrada" ? "pill-ok" : "pill-info"}">${m.tipo}</span></td>
                <td>${esc(window.SICA.centro(m.centro).nombre.replace("Centro de ", ""))}</td><td class="strong">${esc(window.SICA.insumo(m.insumo).nombre)}</td>
                <td class="num" style="text-align:right">${fmt(m.cantidad)}</td><td class="small">${fdate(m.fecha)}</td></tr>`).join("")}
            </tbody></table></div>
          </article>
          <article class="panel glass">
            <div class="panel-head"><div><h2>Existencias por centro</h2><div class="sub">Unidades totales almacenadas</div></div></div>
            ${barChart(porCentro, db.centros.map((c) => c.id))}
            <div class="panel-head" style="margin:20px 0 12px"><div><h2>Capacidad instalada</h2></div></div>
            ${db.centros.map((c) => { const pct = Math.round((c.ocupado / c.capacidad) * 100); return `
              <div style="margin-bottom:12px"><div class="cap-row"><span>${esc(c.nombre.replace("Centro de ", ""))}</span><span class="mono">${pct}%</span></div>
              <div class="stockbar"><i style="width:${pct}%;background:${pct > 85 ? "var(--danger-400)" : pct > 65 ? "var(--warn-400)" : "var(--grad-brand)"}"></i></div></div>`; }).join("")}
          </article>
        </section>`);
    },

    /* ---------- 2. Centros ---------- */
    centros() {
      if (canGestion) $("#pageActions").innerHTML = `<button class="btn btn-primary btn-sm" id="newCentro">${ic("plus")} Registrar centro</button>`;
      const render = () => {
        $("#contenido").insertAdjacentHTML("beforeend", `<section class="center-cards" id="centroCards">
          ${db.centros.map((c) => {
            const pct = Math.round((c.ocupado / c.capacidad) * 100);
            const refs = db.existencias.filter((e) => e.centro === c.id);
            const unidades = refs.reduce((a, e) => a + e.stock, 0);
            return `<article class="center-card glass sheen">
              <h3>${esc(c.nombre)} <span class="pill pill-brand mono">${c.id}</span></h3>
              <div class="loc">${ic("pin")} ${esc(c.ubicacion)} · Resp.: ${esc(c.responsable)}</div>
              <div class="cap-row"><span>Capacidad instalada</span><span class="mono">${fmt(c.ocupado)} / ${fmt(c.capacidad)} m³</span></div>
              <div class="stockbar"><i style="width:${pct}%;background:${pct > 85 ? "var(--danger-400)" : "var(--grad-brand)"}"></i></div>
              <div class="center-stats">
                <div><span>Referencias</span><b>${refs.length}</b></div>
                <div><span>Unidades</span><b>${fmt(unidades)}</b></div>
                <div><span>Ocupación</span><b>${pct}%</b></div>
              </div></article>`;
          }).join("")}</section>
          <section class="panel glass"><div class="panel-head"><div><h2>Registro de sedes</h2><div class="sub">RF-02 · Registrar, editar y consultar centros de apoyo</div></div></div>
          <div class="tbl-wrap"><table class="tbl"><thead><tr><th>ID</th><th>Centro</th><th>Ubicación</th><th>Responsable</th><th style="text-align:right">Capacidad</th><th style="text-align:right">Ocupado</th></tr></thead><tbody>
          ${db.centros.map((c) => `<tr><td class="mono">${c.id}</td><td class="strong">${esc(c.nombre)}</td><td>${esc(c.ubicacion)}</td><td>${esc(c.responsable)}</td><td class="num" style="text-align:right">${fmt(c.capacidad)}</td><td class="num" style="text-align:right">${fmt(c.ocupado)}</td></tr>`).join("")}
          </tbody></table></div></section>`);
        if (canGestion) $("#newCentro").addEventListener("click", () => openModal(`
          <h3>Registrar centro de apoyo</h3><p class="modal-sub">Nueva sede o punto de acopio del ecosistema.</p>
          <form id="fCentro" class="auth-form">
            <div class="field"><label for="cn">Nombre del centro</label><input class="input" id="cn" required placeholder="Centro de Acopio …"></div>
            <div class="field"><label for="cu">Ubicación</label><input class="input" id="cu" required placeholder="Municipio, departamento"></div>
            <div class="field"><label for="cr">Responsable</label><input class="input" id="cr" required placeholder="Nombre y apellido"></div>
            <div class="field"><label for="cc">Capacidad instalada (m³)</label><input class="input" id="cc" type="number" min="1" required placeholder="10000"></div>
            <div class="modal-actions"><button type="button" class="btn btn-ghost btn-sm" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary btn-sm" type="submit">${ic("check")} Guardar</button></div>
          </form>`));
        const f = $("#fCentro"); if (f) f.addEventListener("submit", (e) => {
          e.preventDefault();
          db.centros.push({ id: "CA-0" + (db.centros.length + 1), nombre: $("#cn").value, ubicacion: $("#cu").value, responsable: $("#cr").value, capacidad: +$("#cc").value, ocupado: 0 });
          window.SICA.save(); closeModal(); toast("Centro de apoyo registrado."); location.reload();
        });
      };
      render();
    },

    /* ---------- 3. Inventario ---------- */
    inventario() {
      $("#pageActions").innerHTML = `<button class="btn btn-ghost btn-sm" id="expInv">${ic("download")} Exportar CSV</button>` +
        (canGestion ? `<a class="btn btn-primary btn-sm" href="donaciones.html">${ic("plus")} Registrar entrada</a>` : "");
      $("#contenido").insertAdjacentHTML("beforeend", `
        <section class="filters panel glass" aria-label="Filtros de inventario">
          <div class="field" style="flex:1;min-width:200px"><label class="sr-only" for="fCentro">Centro</label>
            <select class="input" id="fCentro"><option value="">Todos los centros</option>${db.centros.map((c) => `<option value="${c.id}">${esc(c.nombre)}</option>`).join("")}</select></div>
          <div class="field"><label class="sr-only" for="fTipo">Tipo</label>
            <select class="input" id="fTipo"><option value="">Todos los tipos</option>${[...new Set(db.insumos.map((i) => i.tipo))].map((t) => `<option>${t}</option>`).join("")}</select></div>
          <div class="field"><label class="sr-only" for="fEst">Estado</label>
            <select class="input" id="fEst"><option value="">Todos los estados</option><option>ÓPTIMO</option><option>BAJO</option><option>CRÍTICO</option></select></div>
          <div class="field" style="flex:1;min-width:180px"><label class="sr-only" for="fQ">Buscar</label>
            <input class="input" id="fQ" type="search" placeholder="Buscar insumo…"></div>
        </section>
        <section class="panel glass"><div class="tbl-wrap"><table class="tbl" id="tblInv">
          <thead><tr><th>Insumo</th><th>Tipo</th><th>Centro</th><th style="text-align:right">Stock</th><th style="text-align:right">Umbral</th><th>Nivel</th><th>Estado</th></tr></thead>
          <tbody></tbody></table></div></section>`);

      const draw = () => {
        const c = $("#fCentro").value, t = $("#fTipo").value, es = $("#fEst").value, q = $("#fQ").value.toLowerCase();
        const rows = db.existencias.map((e) => ({ e, st: window.SICA.estadoStock(e), ins: window.SICA.insumo(e.insumo), cen: window.SICA.centro(e.centro) }))
          .filter((r) => (!c || r.e.centro === c) && (!t || r.ins.tipo === t) && (!es || r.st.label === es) && (!q || r.ins.nombre.toLowerCase().includes(q)));
        $("#tblInv tbody").innerHTML = rows.length ? rows.map((r) => {
          const pct = Math.min(100, Math.round((r.e.stock / (r.e.umbral * 3)) * 100));
          return `<tr><td class="strong">${esc(r.ins.nombre)}</td><td><span class="pill pill-neutral">${r.ins.tipo}</span></td>
            <td>${esc(r.cen.nombre.replace("Centro de ", ""))} <span class="mono small muted">${r.e.centro}</span></td>
            <td class="num" style="text-align:right">${fmt(r.e.stock)}</td><td class="num small" style="text-align:right">${fmt(r.e.umbral)}</td>
            <td><div class="stockbar"><i style="width:${pct}%;background:${r.st.color}"></i></div></td>
            <td><span class="pill ${r.st.cls}"><span class="dot"></span>${r.st.label}</span></td></tr>`;
        }).join("") : `<tr><td colspan="7"><div class="empty">${ic("search")}<p>Sin resultados para los filtros aplicados.</p></div></td></tr>`;
      };
      ["fCentro", "fTipo", "fEst", "fQ"].forEach((id) => $("#" + id).addEventListener("input", draw));
      draw();
      $("#expInv").addEventListener("click", () => exportCSV("sica-inventario.csv",
        [["Insumo", "Tipo", "Centro", "Stock", "Umbral", "Estado"],
        ...db.existencias.map((e) => [window.SICA.insumo(e.insumo).nombre, window.SICA.insumo(e.insumo).tipo, window.SICA.centro(e.centro).nombre, e.stock, e.umbral, window.SICA.estadoStock(e).label])]));
    },

    /* ---------- 4. Donaciones ---------- */
    donaciones() {
      $("#contenido").insertAdjacentHTML("beforeend", `
        <section class="grid-2">
          <article class="panel glass glass-rim">
            <div class="panel-head"><div><h2>Registrar donación / entrada</h2><div class="sub">CU-01 · El inventario del centro se actualiza de inmediato</div></div></div>
            ${canGestion ? `
            <form id="fDon" class="auth-form" style="gap:14px">
              <div class="grid-2e" style="gap:14px">
                <div class="field"><label for="dCentro">Centro de apoyo</label><select class="input" id="dCentro" required>${db.centros.map((c) => `<option value="${c.id}">${esc(c.nombre)}</option>`).join("")}</select></div>
                <div class="field"><label for="dFecha">Fecha de ingreso</label><input class="input" id="dFecha" type="date" required value="${window.SICA.hoy()}"></div>
              </div>
              <div class="grid-2e" style="gap:14px">
                <div class="field"><label for="dInsumo">Tipo de insumo</label><select class="input" id="dInsumo" required>${db.insumos.map((i) => `<option value="${i.id}">${esc(i.nombre)} · ${i.tipo}</option>`).join("")}</select></div>
                <div class="field"><label for="dCant">Cantidad</label><input class="input" id="dCant" type="number" min="1" required placeholder="0"></div>
              </div>
              <div class="field"><label for="dOrigen">Origen de la donación</label><input class="input" id="dOrigen" required placeholder="Organismo, entidad o campaña donante"></div>
              <button class="btn btn-primary" type="submit">${ic("check")} Confirmar entrada</button>
            </form>` : `<div class="empty">${ic("eye")}<p>Tu rol no tiene permisos de escritura (RF-10).</p></div>`}
          </article>
          <article class="panel glass">
            <div class="panel-head"><div><h2>Últimas donaciones</h2><div class="sub">Origen y destino de los ingresos recientes</div></div></div>
            <div class="trace" id="donTrace"></div>
          </article>
        </section>
        <section class="panel glass"><div class="panel-head"><div><h2>Historial de movimientos de entrada</h2><div class="sub">RF-04 · Trazabilidad completa con referencia de origen</div></div>
          <button class="btn btn-ghost btn-sm" id="expDon">${ic("download")} Exportar CSV</button></div>
          <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Ref.</th><th>Centro</th><th>Insumo</th><th style="text-align:right">Cantidad</th><th>Origen</th><th>Fecha</th><th>Registró</th></tr></thead><tbody>
          ${db.movimientos.filter((m) => m.tipo === "Entrada").map((m) => `<tr><td class="mono small">${m.ref.split(" · ")[0]}</td>
            <td>${esc(window.SICA.centro(m.centro).nombre.replace("Centro de ", ""))}</td><td class="strong">${esc(window.SICA.insumo(m.insumo).nombre)}</td>
            <td class="num" style="text-align:right">${fmt(m.cantidad)}</td><td class="small">${esc(m.ref.split(" · ")[1] || "—")}</td>
            <td class="small">${fdate(m.fecha)}</td><td class="small">${esc(m.usuario)}</td></tr>`).join("")}
          </tbody></table></div></section>`);

      const drawTrace = () => {
        $("#donTrace").innerHTML = db.movimientos.filter((m) => m.tipo === "Entrada").slice(0, 5).map((m) => `
          <div class="trace-item"><span class="trace-dot" style="color:var(--ok-400)">${ic("arrowDown")}</span>
          <div><p><b class="mono">${fmt(m.cantidad)}</b> ${esc(window.SICA.insumo(m.insumo).nombre)} → ${esc(window.SICA.centro(m.centro).nombre.replace("Centro de ", ""))}</p>
          <time>${esc(m.ref)} · ${fdate(m.fecha)}</time></div></div>`).join("");
      };
      drawTrace();
      const f = $("#fDon");
      if (f) f.addEventListener("submit", (e) => {
        e.preventDefault();
        const m = window.SICA.registrarDonacion({ centro: $("#dCentro").value, insumo: $("#dInsumo").value, cantidad: +$("#dCant").value, origen: $("#dOrigen").value, fecha: $("#dFecha").value, usuario: user.nombre });
        toast(`Entrada ${m.id}: inventario actualizado en ${window.SICA.centro(m.centro).id}.`);
        location.reload();
      });
      $("#expDon").addEventListener("click", () => exportCSV("sica-donaciones.csv",
        [["Referencia", "Centro", "Insumo", "Cantidad", "Origen", "Fecha", "Registró"],
        ...db.movimientos.filter((m) => m.tipo === "Entrada").map((m) => [m.ref, window.SICA.centro(m.centro).nombre, window.SICA.insumo(m.insumo).nombre, m.cantidad, m.ref.split(" · ")[1] || "", m.fecha, m.usuario])]));
    },

    /* ---------- 5. Distribución ---------- */
    distribucion() {
      const listas = db.solicitudes.filter((s) => s.estado === "Confirmada");
      $("#contenido").insertAdjacentHTML("beforeend", `
        <section class="panel glass">
          <div class="panel-head"><div><h2>Solicitudes confirmadas para despacho</h2><div class="sub">CU-03 · Selecciona y genera la lista de carga; bodega y conducción serán notificados</div></div>
          ${canDespacho ? `<button class="btn btn-primary btn-sm" id="genDes" ${listas.length ? "" : "disabled"}>${ic("send")} Generar lista de despacho</button>` : `<span class="pill pill-neutral">${ic("eye")} Solo lectura</span>`}</div>
          <div class="req-list" id="reqList">
            ${listas.length ? listas.map((s) => {
              const b = window.SICA.ben(s.beneficiario), r = window.SICA.resilia(s);
              return `<label class="req-card glass-sm" style="cursor:pointer"><div>
                <div class="t"><input type="checkbox" class="sel" value="${s.id}" style="accent-color:var(--teal-400);margin-right:10px">${esc(window.SICA.insumo(s.insumo).nombre)} · <span class="mono">${fmt(s.cantidad)}</span> ${esc(window.SICA.insumo(s.insumo).unidad)}(s)</div>
                <div class="meta"><span>${esc(b ? b.nombre : "—")}</span><span>${s.id}</span><span>Solicitado ${fdate(s.fecha)}</span><span class="score">Resilia ${r.score}/100</span></div></div>
                ${nivelPill(r.nivel)}</label>`;
            }).join("") : `<div class="empty">${ic("check")}<p>No hay solicitudes confirmadas pendientes de despacho.</p></div>`}
          </div>
        </section>
        <section class="panel glass"><div class="panel-head"><div><h2>Despachos</h2><div class="sub">Flujo: Preparando → En ruta → Entregado (descuento de stock en tiempo real)</div></div></div>
          <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Despacho</th><th>Centro</th><th>Contenido</th><th>Conducción</th><th>Estado</th><th>Fecha</th><th></th></tr></thead><tbody id="tblDes">
          ${db.despachos.map((d) => `<tr data-id="${d.id}">
            <td class="mono">${d.id}</td><td>${esc(window.SICA.centro(d.centro).nombre.replace("Centro de ", ""))}</td>
            <td class="small">${d.items.map((i) => `${fmt(i.cantidad)} × ${esc(window.SICA.insumo(i.insumo).nombre)}`).join("<br>")}</td>
            <td class="small">${esc(d.conductor)}<br><span class="mono muted">${esc(d.vehiculo)}</span></td>
            <td><span class="pill ${estadoPill(d.estado)}"><span class="dot"></span>${d.estado}</span></td>
            <td class="small">${fdate(d.fecha)}</td>
            <td style="text-align:right">${canDespacho && d.estado !== "Entregado" ? `<button class="btn btn-ghost btn-xs av" data-id="${d.id}">${d.estado === "Preparando" ? "Autorizar salida" : "Confirmar entrega"}</button>` : ""}</td></tr>`).join("")}
          </tbody></table></div></section>`);

      const gen = $("#genDes");
      if (gen) gen.addEventListener("click", () => {
        const ids = [...document.querySelectorAll(".sel:checked")].map((c) => c.value);
        if (!ids.length) return toast("Selecciona al menos una solicitud confirmada.", "warn");
        openModal(`
          <h3>Generar lista de despacho</h3><p class="modal-sub">${ids.length} solicitud(es) · se notificará a bodega y conducción al guardar.</p>
          <form id="fDes" class="auth-form">
            <div class="field"><label for="xCentro">Centro que despacha</label><select class="input" id="xCentro" required>${db.centros.map((c) => `<option value="${c.id}">${esc(c.nombre)}</option>`).join("")}</select></div>
            <div class="grid-2e" style="gap:14px">
              <div class="field"><label for="xCon">Conductor</label><input class="input" id="xCon" required placeholder="Nombre del conductor"></div>
              <div class="field"><label for="xVeh">Vehículo</label><input class="input" id="xVeh" required placeholder="Placa / interno"></div>
            </div>
            <div id="stockWarn"></div>
            <div class="modal-actions"><button type="button" class="btn btn-ghost btn-sm" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary btn-sm" type="submit">${ic("send")} Generar y notificar</button></div>
          </form>`);
        const items = [];
        ids.forEach((sid) => { const s = db.solicitudes.find((x) => x.id === sid); const it = items.find((i) => i.insumo === s.insumo); if (it) it.cantidad += s.cantidad; else items.push({ insumo: s.insumo, cantidad: s.cantidad }); });
        const check = () => {
          const falt = window.SICA.stockInsuficiente($("#xCentro").value, items);
          $("#stockWarn").innerHTML = falt.length ? `<div class="auth-demo" style="background:rgba(244,63,94,.08);border-color:rgba(251,113,133,.3)"><p style="color:#fda4af">${ic("alert")} Stock insuficiente: ${falt.map((i) => `${esc(window.SICA.insumo(i.insumo).nombre)} (${fmt(i.cantidad)} req.)`).join(", ")}. Ajusta la carga antes de confirmar la salida (flujo alternativo CU-03).</p></div>` : "";
        };
        $("#xCentro").addEventListener("change", check); check();
        $("#fDes").addEventListener("submit", (e) => {
          e.preventDefault();
          const d = window.SICA.generarDespacho({ centro: $("#xCentro").value, solicitudIds: ids, conductor: $("#xCon").value, vehiculo: $("#xVeh").value });
          closeModal(); toast(`${d.id} generado: bodega y conducción notificados.`); setTimeout(() => location.reload(), 700);
        });
      });
      document.querySelectorAll(".av").forEach((b) => b.addEventListener("click", () => {
        const d = window.SICA.avanzarDespacho(b.dataset.id);
        toast(`${d.id} → ${d.estado}${d.estado === "Entregado" ? ": stock descontado en tiempo real." : "."}`);
        setTimeout(() => location.reload(), 700);
      }));
    },

    /* ---------- 6. Beneficiarios (SIGA) ---------- */
    beneficiarios() {
      $("#pageActions").innerHTML = canGestion ? `<button class="btn btn-primary btn-sm" id="newBen">${ic("plus")} Registrar beneficiario</button>` : "";
      $("#contenido").insertAdjacentHTML("beforeend", `
        <section class="filters panel glass"><div class="field" style="flex:1;min-width:220px"><label class="sr-only" for="bQ">Buscar</label>
          <input class="input" id="bQ" type="search" placeholder="Buscar por nombre, ID o ubicación…"></div>
          <div class="field"><label class="sr-only" for="bT">Tipo</label><select class="input" id="bT"><option value="">Hogares y comunidades</option><option>Hogar</option><option>Comunidad</option></select></div>
          <div class="field"><label class="sr-only" for="bV">Vulnerabilidad</label><select class="input" id="bV"><option value="">Toda vulnerabilidad</option><option>Alta</option><option>Media</option><option>Baja</option></select></div>
        </section>
        <section class="panel glass"><div class="tbl-wrap"><table class="tbl" id="tblBen">
          <thead><tr><th>ID</th><th>Beneficiario</th><th>Tipo</th><th style="text-align:right">Familias</th><th style="text-align:right">Personas</th><th>Ubicación</th><th>Vulnerabilidad</th><th style="text-align:right">Solicitudes</th></tr></thead><tbody></tbody></table></div></section>`);
      const draw = () => {
        const q = $("#bQ").value.toLowerCase(), t = $("#bT").value, v = $("#bV").value;
        const rows = db.beneficiarios.filter((b) => (!q || (b.nombre + b.id + b.ubicacion).toLowerCase().includes(q)) && (!t || b.tipo === t) && (!v || b.vulnerabilidad === v));
        $("#tblBen tbody").innerHTML = rows.length ? rows.map((b) => {
          const ns = db.solicitudes.filter((s) => s.beneficiario === b.id).length;
          return `<tr style="cursor:pointer" data-id="${b.id}"><td class="mono">${b.id}</td><td class="strong">${esc(b.nombre)}</td>
            <td><span class="pill pill-neutral">${b.tipo}</span></td><td class="num" style="text-align:right">${b.familias}</td>
            <td class="num" style="text-align:right">${fmt(b.personas)}</td><td class="small">${esc(b.ubicacion)}</td>
            <td><span class="pill ${b.vulnerabilidad === "Alta" ? "pill-danger" : b.vulnerabilidad === "Media" ? "pill-warn" : "pill-ok"}">${b.vulnerabilidad}</span></td>
            <td class="num" style="text-align:right">${ns}</td></tr>`;
        }).join("") : `<tr><td colspan="8"><div class="empty">${ic("users")}<p>Sin coincidencias en el padrón.</p></div></td></tr>`;
        document.querySelectorAll("#tblBen tbody tr[data-id]").forEach((tr) => tr.addEventListener("click", () => ficha(tr.dataset.id)));
      };
      const ficha = (id) => {
        const b = window.SICA.ben(id);
        const sols = db.solicitudes.filter((s) => s.beneficiario === id);
        openModal(`
          <h3>${esc(b.nombre)} <span class="pill pill-brand mono" style="vertical-align:middle">${b.id}</span></h3>
          <p class="modal-sub">${b.tipo} · ${esc(b.ubicacion)} · ${b.familias} familia(s), ${fmt(b.personas)} persona(s)</p>
          <div class="auth-demo" style="margin-top:0"><p><b style="color:var(--teal-300)">Vulnerabilidad ${b.vulnerabilidad}</b><br>${esc(b.notas || "Sin notas adicionales.")}</p></div>
          <div class="panel-head" style="margin:20px 0 10px"><h3 style="font-size:.95rem">Solicitudes asociadas</h3>
            ${canGestion ? `<button class="btn btn-ghost btn-xs" id="addSol">${ic("plus")} Nueva solicitud</button>` : ""}</div>
          ${sols.length ? `<div class="req-list">${sols.map((s) => { const r = window.SICA.resilia(s); return `
            <div class="req-card glass-sm"><div><div class="t">${esc(window.SICA.insumo(s.insumo).nombre)} · ${fmt(s.cantidad)}</div>
            <div class="meta"><span class="mono">${s.id}</span><span>${fdate(s.fecha)}</span><span class="pill ${estadoPill(s.estado)}">${s.estado}</span></div></div>${nivelPill(r.nivel)}</div>`; }).join("")}</div>`
            : `<div class="empty"><p>Sin solicitudes registradas.</p></div>`}
          <div class="modal-actions"><button class="btn btn-ghost btn-sm" onclick="closeModal()">Cerrar</button></div>`);
        const as = $("#addSol");
        if (as) as.addEventListener("click", () => openModal(`
          <h3>Nueva solicitud de ayuda</h3><p class="modal-sub">Asociada a ${esc(b.nombre)} · Resilia la clasificará automáticamente.</p>
          <form id="fSol" class="auth-form">
            <div class="field"><label for="sIn">Insumo solicitado</label><select class="input" id="sIn" required>${db.insumos.map((i) => `<option value="${i.id}">${esc(i.nombre)}</option>`).join("")}</select></div>
            <div class="field"><label for="sCa">Cantidad</label><input class="input" id="sCa" type="number" min="1" required placeholder="0"></div>
            <div class="field"><label for="sMo">Motivo / situación</label><textarea class="input" id="sMo" rows="3" required placeholder="Describe brevemente la necesidad…"></textarea></div>
            <div class="modal-actions"><button type="button" class="btn btn-ghost btn-sm" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary btn-sm" type="submit">${ic("zap")} Registrar y clasificar</button></div>
          </form>`));
        const fs = $("#fSol");
        if (fs) fs.addEventListener("submit", (e) => {
          e.preventDefault();
          const { sol, r } = window.SICA.registrarSolicitud({ beneficiario: id, insumo: $("#sIn").value, cantidad: +$("#sCa").value, motivo: $("#sMo").value });
          closeModal(); toast(`Resilia clasificó ${sol.id} como ${r.nivel} (puntaje ${r.score}).`, r.nivel === "ALTA" ? "err" : "ok");
          setTimeout(() => location.reload(), 800);
        });
      };
      ["bQ", "bT", "bV"].forEach((id) => $("#" + id).addEventListener("input", draw));
      draw();
      const nb = $("#newBen");
      if (nb) nb.addEventListener("click", () => openModal(`
        <h3>Registrar beneficiario</h3><p class="modal-sub">CU-08 · Caracterización para el padrón SIGA.</p>
        <form id="fBen" class="auth-form">
          <div class="grid-2e" style="gap:14px">
            <div class="field"><label for="nTipo">Tipo</label><select class="input" id="nTipo"><option>Hogar</option><option>Comunidad</option></select></div>
            <div class="field"><label for="nVul">Vulnerabilidad</label><select class="input" id="nVul"><option>Alta</option><option selected>Media</option><option>Baja</option></select></div>
          </div>
          <div class="field"><label for="nNom">Nombre</label><input class="input" id="nNom" required placeholder="Familia … / Vereda …"></div>
          <div class="field"><label for="nCon">Contacto</label><input class="input" id="nCon" required placeholder="Persona o figura de contacto"></div>
          <div class="grid-2e" style="gap:14px">
            <div class="field"><label for="nFam">Familias</label><input class="input" id="nFam" type="number" min="1" value="1" required></div>
            <div class="field"><label for="nPer">Personas</label><input class="input" id="nPer" type="number" min="1" required placeholder="0"></div>
          </div>
          <div class="field"><label for="nUbi">Ubicación</label><input class="input" id="nUbi" required placeholder="Barrio / vereda, municipio"></div>
          <div class="field"><label for="nNot">Notas de caracterización</label><textarea class="input" id="nNot" rows="2" placeholder="Opcional"></textarea></div>
          <div class="modal-actions"><button type="button" class="btn btn-ghost btn-sm" onclick="closeModal()">Cancelar</button>
          <button class="btn btn-primary btn-sm" type="submit">${ic("check")} Guardar en el padrón</button></div>
        </form>`));
      const fb = $("#fBen");
      if (fb) fb.addEventListener("submit", (e) => {
        e.preventDefault();
        const b = window.SICA.registrarBeneficiario({ tipo: $("#nTipo").value, nombre: $("#nNom").value, contacto: $("#nCon").value, familias: +$("#nFam").value, personas: +$("#nPer").value, ubicacion: $("#nUbi").value, vulnerabilidad: $("#nVul").value, notas: $("#nNot").value });
        closeModal(); toast(`Beneficiario ${b.id} registrado en SIGA.`); setTimeout(() => location.reload(), 700);
      });
    },

    /* ---------- 7. Priorización (Resilia) ---------- */
    priorizacion() {
      const act = db.solicitudes.filter((s) => s.estado === "Pendiente" || s.estado === "Confirmada");
      const scored = act.map((s) => ({ s, r: window.SICA.resilia(s) })).sort((a, b) => b.r.score - a.r.score || a.s.fecha.localeCompare(b.s.fecha));
      const CRIT = { Salud: "Alta", Alimentos: "Alta", Higiene: "Media", Alojamiento: "Media" };
      const cell = (niv, cri) => scored.filter((x) => x.r.nivel === niv && CRIT[window.SICA.insumo(x.s.insumo).tipo] === cri);
      const niveles = ["ALTA", "MEDIA", "BAJA"], crits = ["Alta", "Media", "Baja"];
      $("#contenido").insertAdjacentHTML("beforeend", `
        <section class="grid-2">
          <article class="panel glass glass-rim">
            <div class="panel-head"><div><h2>Matriz de urgencia × criticidad</h2><div class="sub">Clasificación automática de Resilia con supervisión humana (RF-08)</div></div>
            <span class="pill pill-brand">${ic("zap")} Resilia activo</span></div>
            <div class="matrix" role="table" aria-label="Matriz de urgencia y criticidad">
              <span></span>${crits.map((c) => `<span class="mh">Criticidad ${c}</span>`).join("")}
              ${niveles.map((n) => `<span class="mv">Urg.<br>${n}</span>` + crits.map((c) => {
                const items = cell(n, c);
                const lv = n === "ALTA" ? "lv-high" : n === "MEDIA" ? "lv-mid" : "lv-low";
                return `<div class="mcell ${lv}" title="${items.map((i) => i.s.id).join(", ")}"><b>${items.length}</b><span>${items.slice(0, 2).map((i) => i.s.id).join(" · ") || "—"}</span></div>`;
              }).join("")).join("")}
            </div>
            <p class="small muted" style="margin-top:16px">Puntaje = 0,35·magnitud + 0,25·vulnerabilidad + 0,25·esencialidad + 0,15·tiempo. Niveles: ALTA ≥ 70 · MEDIA 40–69 · BAJA &lt; 40. Los empates se resuelven por fecha de ingreso.</p>
          </article>
          <article class="panel glass">
            <div class="panel-head"><div><h2>Cola de revisión</h2><div class="sub">Ordenada por puntaje; confirmación del encargado antes del despacho</div></div></div>
            <div class="req-list">
              ${scored.length ? scored.map(({ s, r }) => `
                <div class="req-card glass-sm"><div>
                  <div class="t">${esc(window.SICA.insumo(s.insumo).nombre)} · <span class="mono">${fmt(s.cantidad)}</span></div>
                  <div class="meta"><span class="mono">${s.id}</span><span>${esc((window.SICA.ben(s.beneficiario) || {}).nombre || "—")}</span><span>${fdate(s.fecha)}</span><span class="score">score ${r.score}</span>
                  <span class="pill ${estadoPill(s.estado)}">${s.estado}</span></div></div>
                  <div style="display:flex;align-items:center;gap:10px">${nivelPill(r.nivel)}
                  ${canGestion && s.estado === "Pendiente" ? `<button class="btn btn-ghost btn-xs conf" data-id="${s.id}">${ic("check")} Confirmar</button>` : ""}</div>
                </div>`).join("") : `<div class="empty">${ic("check")}<p>Sin solicitudes por revisar.</p></div>`}
            </div>
          </article>
        </section>
        <section class="panel glass"><div class="panel-head"><div><h2>Desglose del algoritmo</h2><div class="sub">Transparencia de la clasificación por solicitud activa</div></div></div>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Solicitud</th><th>Beneficiario</th><th style="text-align:right">Magnitud</th><th style="text-align:right">Vulnerab.</th><th style="text-align:right">Esencialidad</th><th style="text-align:right">Tiempo</th><th style="text-align:right">Puntaje</th><th>Nivel</th></tr></thead><tbody>
        ${scored.map(({ s, r }) => `<tr><td class="mono">${s.id}</td><td class="strong">${esc((window.SICA.ben(s.beneficiario) || {}).nombre || "—")}</td>
          <td class="num" style="text-align:right">${r.magnitud}</td><td class="num" style="text-align:right">${r.vuln}</td><td class="num" style="text-align:right">${r.esencia}</td>
          <td class="num" style="text-align:right">${r.tiempo}</td><td class="num" style="text-align:right"><b>${r.score}</b></td><td>${nivelPill(r.nivel)}</td></tr>`).join("")}
        </tbody></table></div></section>`);
      document.querySelectorAll(".conf").forEach((b) => b.addEventListener("click", () => {
        window.SICA.confirmarSolicitud(b.dataset.id);
        toast(`${b.dataset.id} confirmada: disponible para la próxima lista de carga.`);
        setTimeout(() => location.reload(), 600);
      }));
    },

    /* ---------- 8. Reportes ---------- */
    reportes() {
      $("#contenido").insertAdjacentHTML("beforeend", `
        <section class="filters panel glass">
          <div class="field"><label class="sr-only" for="rDesde">Desde</label><input class="input" type="date" id="rDesde" value="${new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10)}"></div>
          <div class="field"><label class="sr-only" for="rHasta">Hasta</label><input class="input" type="date" id="rHasta" value="${window.SICA.hoy()}"></div>
          <div class="field"><label class="sr-only" for="rCentro">Centro</label><select class="input" id="rCentro"><option value="">Todos los centros</option>${db.centros.map((c) => `<option value="${c.id}">${esc(c.nombre)}</option>`).join("")}</select></div>
          <div class="field"><label class="sr-only" for="rTipo">Tipo</label><select class="input" id="rTipo"><option value="">Entradas y salidas</option><option>Entrada</option><option>Salida</option></select></div>
          <button class="btn btn-ghost btn-sm" id="rGen">${ic("refresh")} Generar</button>
          <div style="margin-left:auto;display:flex;gap:10px">
            <button class="btn btn-ghost btn-sm" id="rCsv">${ic("download")} Excel (CSV)</button>
            <button class="btn btn-primary btn-sm" id="rPdf">${ic("printer")} PDF</button>
          </div>
        </section>
        <section class="kpis" id="rKpis"></section>
        <section class="panel glass" id="rPrint"><div class="panel-head"><div><h2>Trazabilidad del período</h2><div class="sub" id="rRango"></div></div>
          <span class="pill pill-neutral mono">SICA · v1.0</span></div>
          <div class="tbl-wrap"><table class="tbl" id="rTbl"><thead><tr><th>Mov.</th><th>Tipo</th><th>Centro</th><th>Insumo</th><th style="text-align:right">Cantidad</th><th>Referencia</th><th>Fecha</th><th>Usuario</th></tr></thead><tbody></tbody></table></div>
          <p class="small muted" style="margin-top:18px">Documento generado por el módulo de Reportes de SICA para rendición de cuentas ante organismos donantes (Manual Sphere, estándar de trazabilidad).</p>
        </section>`);
      const draw = () => {
        const d0 = $("#rDesde").value, d1 = $("#rHasta").value, c = $("#rCentro").value, t = $("#rTipo").value;
        const rows = db.movimientos.filter((m) => m.fecha >= d0 && m.fecha <= d1 && (!c || m.centro === c) && (!t || m.tipo === t));
        const ent = rows.filter((m) => m.tipo === "Entrada").reduce((a, m) => a + m.cantidad, 0);
        const sal = rows.filter((m) => m.tipo === "Salida").reduce((a, m) => a + m.cantidad, 0);
        const des = db.despachos.filter((d) => d.fecha >= d0 && d.fecha <= d1 && (!c || d.centro === c));
        $("#rKpis").innerHTML = `
          <article class="kpi glass"><div class="top"><span class="label">Unidades ingresadas</span>${ic("inbox")}</div><div class="value">${fmt(ent)}</div></article>
          <article class="kpi glass"><div class="top"><span class="label">Unidades despachadas</span>${ic("truck")}</div><div class="value">${fmt(sal)}</div></article>
          <article class="kpi glass"><div class="top"><span class="label">Despachos</span>${ic("send")}</div><div class="value">${des.length}</div></article>
          <article class="kpi glass"><div class="top"><span class="label">Movimientos trazados</span>${ic("file")}</div><div class="value">${rows.length}</div></article>`;
        $("#rRango").textContent = `${fdate(d0)} — ${fdate(d1)} · ${c ? window.SICA.centro(c).nombre : "Todos los centros"} · ${rows.length} movimiento(s)`;
        $("#rTbl tbody").innerHTML = rows.length ? rows.map((m) => `<tr><td class="mono small">${m.id}</td>
          <td><span class="pill ${m.tipo === "Entrada" ? "pill-ok" : "pill-info"}">${m.tipo}</span></td>
          <td>${esc(window.SICA.centro(m.centro).nombre.replace("Centro de ", ""))}</td><td class="strong">${esc(window.SICA.insumo(m.insumo).nombre)}</td>
          <td class="num" style="text-align:right">${fmt(m.cantidad)}</td><td class="small">${esc(m.ref)}</td><td class="small">${fdate(m.fecha)}</td><td class="small">${esc(m.usuario)}</td></tr>`).join("")
          : `<tr><td colspan="8"><div class="empty">${ic("file")}<p>No hay movimientos en el rango seleccionado (flujo alternativo CU-04).</p></div></td></tr>`;
        window._rRows = rows;
      };
      ["rDesde", "rHasta", "rCentro", "rTipo"].forEach((id) => $("#" + id).addEventListener("change", draw));
      $("#rGen").addEventListener("click", () => { draw(); toast("Reporte generado."); });
      draw();
      $("#rCsv").addEventListener("click", () => exportCSV("sica-trazabilidad.csv",
        [["Movimiento", "Tipo", "Centro", "Insumo", "Cantidad", "Referencia", "Fecha", "Usuario"],
        ...window._rRows.map((m) => [m.id, m.tipo, window.SICA.centro(m.centro).nombre, window.SICA.insumo(m.insumo).nombre, m.cantidad, m.ref, m.fecha, m.usuario])]));
      $("#rPdf").addEventListener("click", () => window.print());
    }
  };

  buildShell();
  (renderers[page] || renderers.dashboard)();
})();
