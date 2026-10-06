/* ============================================================
   SICA · Landing — interacciones
   ============================================================ */
(function () {
  "use strict";

  /* Nav: estado scroll + menú móvil */
  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const burger = document.getElementById("burger");
    if (burger) burger.addEventListener("click", () => nav.classList.toggle("nav-menu-open"));
    nav.querySelectorAll(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("nav-menu-open")));
  }

  /* Reveal on scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* Contadores animados */
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target, end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const v = end * ease(p);
        el.textContent = (el.dataset.prefix || "") + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString("es-CO")) + (el.dataset.suffix || "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

  /* Demo interactiva del flujo de despacho */
  const FLOW = [
    {
      t: "Consolidación",
      d: "El encargado revisa las solicitudes priorizadas por Resilia y genera la lista de carga con los insumos confirmados. El sistema valida stock disponible contra el inventario del centro antes de continuar.",
      chips: [["Resilia · score 82 · ALTA", "pill-danger"], ["SOL-0091 · 600 und. agua 5L", "pill-neutral"], ["Stock CA-01 validado", "pill-ok"]]
    },
    {
      t: "Notificación automática",
      d: "Al guardar la lista, SICA envía una alerta instantánea a la bandeja del personal de bodega y a los conductores asignados. Se acabaron las coordinaciones telefónicas en plena emergencia.",
      chips: [["Bodega notificada · 0 s", "pill-ok"], ["Conducción notificada · 0 s", "pill-ok"], ["Latencia < 2 s (RNF-03)", "pill-info"]]
    },
    {
      t: "Preparación y carga",
      d: "El equipo de bodega recibe la lista en su dispositivo, alista los insumos y los carga en el vehículo asignado. Cada ítem queda marcado contra la lista de carga.",
      chips: [["DES-0032 · Preparando", "pill-warn"], ["Camión TGM-482", "pill-neutral"], ["3 referencias · 645 und.", "pill-neutral"]]
    },
    {
      t: "Confirmación y despacho",
      d: "Se autoriza la salida del vehículo y el sistema descuenta el stock del centro en tiempo real. El movimiento queda fechado y referenciado para trazabilidad y rendición de cuentas.",
      chips: [["DES-0032 · En ruta", "pill-info"], ["Stock descontado en vivo", "pill-ok"], ["Trazabilidad CU-04 lista", "pill-brand"]]
    }
  ];
  const steps = document.querySelectorAll(".flow-step");
  const panel = document.getElementById("flowPanel");
  function setFlow(i) {
    steps.forEach((s, k) => s.setAttribute("aria-selected", k === i ? "true" : "false"));
    const f = FLOW[i];
    panel.innerHTML = `<h4><span class="pill pill-brand mono">Paso ${i + 1} / 4</span> ${f.t}</h4><p>${f.d}</p>
      <div class="flow-chips">${f.chips.map((c) => `<span class="pill ${c[1]}">${c[0]}</span>`).join("")}</div>`;
    panel.style.animation = "none"; void panel.offsetWidth; panel.style.animation = "popIn 320ms cubic-bezier(.22,1,.36,1)";
  }
  steps.forEach((s, i) => s.addEventListener("click", () => { setFlow(i); clearInterval(window._flowAuto); }));
  if (steps.length) {
    setFlow(0);
    window._flowAuto = setInterval(() => {
      const cur = [...steps].findIndex((s) => s.getAttribute("aria-selected") === "true");
      setFlow((cur + 1) % FLOW.length);
    }, 5200);
  }

  /* Año del footer */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
