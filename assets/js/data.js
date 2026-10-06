/* ============================================================
   SICA · Capa de datos del prototipo
   Semilla + store con persistencia (localStorage) + Resilia
   ============================================================ */
(function () {
  "use strict";

  const KEY = "sica.db.v1";
  const SESSION = "sica.session.v1";

  const today = () => new Date().toISOString().slice(0, 10);
  const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
  const hoursAgo = (n) => new Date(Date.now() - n * 36e5).toISOString();

  /* ---------- Semilla ---------- */
  function seed() {
    return {
      usuarios: [
        { id: "U-01", nombre: "Cesar Grain",   email: "inventario@sica.org", pass: "sica2026", rol: "Encargado de inventario", iniciales: "CG" },
        { id: "U-02", nombre: "Samira Naranjo", email: "admin@sica.org",      pass: "sica2026", rol: "Administradora",          iniciales: "SN" },
        { id: "U-03", nombre: "Jhon Orobio",    email: "bodega@sica.org",     pass: "sica2026", rol: "Personal de bodega",      iniciales: "JO" },
        { id: "U-04", nombre: "Luis Montaño",   email: "conductor@sica.org",  pass: "sica2026", rol: "Conductor",               iniciales: "LM" },
        { id: "U-05", nombre: "Org. Donante",   email: "donante@sica.org",    pass: "sica2026", rol: "Organismo donante",       iniciales: "OD" }
      ],
      centros: [
        { id: "CA-01", nombre: "Centro de Acopio Buenaventura", ubicacion: "Buenaventura, Valle del Cauca", responsable: "Cesar Grain",  capacidad: 12000, ocupado: 8340 },
        { id: "CA-02", nombre: "Centro de Apoyo Litoral Pacífico", ubicacion: "Tumaco, Nariño",              responsable: "María Ibargüen", capacidad: 8000,  ocupado: 3120 },
        { id: "CA-03", nombre: "Centro de Acopio Regional Cali",  ubicacion: "Cali, Valle del Cauca",        responsable: "Jhon Orobio",    capacidad: 15000, ocupado: 6480 }
      ],
      insumos: [
        { id: "IN-01", nombre: "Agua potable 5L",        tipo: "Alimentos",      unidad: "unidad" },
        { id: "IN-02", nombre: "Kit alimentario familiar", tipo: "Alimentos",    unidad: "kit" },
        { id: "IN-03", nombre: "Colchoneta individual",  tipo: "Alojamiento",    unidad: "unidad" },
        { id: "IN-04", nombre: "Kit de higiene personal", tipo: "Higiene",       unidad: "kit" },
        { id: "IN-05", nombre: "Botiquín primeros auxilios", tipo: "Salud",      unidad: "unidad" },
        { id: "IN-06", nombre: "Cobija térmica",         tipo: "Alojamiento",    unidad: "unidad" },
        { id: "IN-07", nombre: "Suero oral",             tipo: "Salud",          unidad: "unidad" },
        { id: "IN-08", nombre: "Arroz 1kg",              tipo: "Alimentos",      unidad: "bolsa" }
      ],
      existencias: [
        { centro: "CA-01", insumo: "IN-01", stock: 1450, umbral: 400 },
        { centro: "CA-01", insumo: "IN-02", stock: 320,  umbral: 150 },
        { centro: "CA-01", insumo: "IN-03", stock: 96,   umbral: 120 },
        { centro: "CA-01", insumo: "IN-04", stock: 540,  umbral: 200 },
        { centro: "CA-01", insumo: "IN-05", stock: 58,   umbral: 60 },
        { centro: "CA-02", insumo: "IN-01", stock: 610,  umbral: 300 },
        { centro: "CA-02", insumo: "IN-02", stock: 140,  umbral: 100 },
        { centro: "CA-02", insumo: "IN-06", stock: 210,  umbral: 80 },
        { centro: "CA-03", insumo: "IN-01", stock: 2200, umbral: 500 },
        { centro: "CA-03", insumo: "IN-07", stock: 380,  umbral: 150 },
        { centro: "CA-03", insumo: "IN-08", stock: 1750, umbral: 600 },
        { centro: "CA-03", insumo: "IN-04", stock: 260,  umbral: 250 }
      ],
      beneficiarios: [
        { id: "BEN-0142", tipo: "Comunidad", nombre: "Vereda El Guadual", contacto: "Junta de Acción Comunal", familias: 34, personas: 148, ubicacion: "Zona rural, Buenaventura", vulnerabilidad: "Alta", notas: "Acceso vial interrumpado por derrumbe." },
        { id: "BEN-0143", tipo: "Hogar", nombre: "Familia Mena Ruiz", contacto: "Ana Mena", familias: 1, personas: 6, ubicacion: "Barrio Bajo Calima, Buenaventura", vulnerabilidad: "Media", notas: "Dos menores y un adulto mayor." },
        { id: "BEN-0144", tipo: "Comunidad", nombre: "Consejo Comunitario Río Naya", contacto: "Representante legal", familias: 62, personas: 301, ubicacion: "Ribera del río Naya", vulnerabilidad: "Alta", notas: "Inundación repentina el 28 del mes pasado." },
        { id: "BEN-0145", tipo: "Hogar", nombre: "Familia Cortés Padilla", contacto: "Luis Cortés", familias: 1, personas: 4, ubicacion: "Tumaco, Nariño", vulnerabilidad: "Baja", notas: "" },
        { id: "BEN-0146", tipo: "Comunidad", nombre: "Asentamiento La Esperanza", contacto: "Comité de vivienda", familias: 21, personas: 89, ubicacion: "Periferia de Cali", vulnerabilidad: "Media", notas: "Familias reubicadas por emergencia." }
      ],
      solicitudes: [
        { id: "SOL-0091", beneficiario: "BEN-0144", insumo: "IN-01", cantidad: 600, fecha: daysAgo(1), estado: "Confirmada",  motivo: "Inundación: sin acceso a agua segura." },
        { id: "SOL-0092", beneficiario: "BEN-0142", insumo: "IN-05", cantidad: 40, fecha: daysAgo(2), estado: "Pendiente", motivo: "Atención primaria tras derrumbe." },
        { id: "SOL-0093", beneficiario: "BEN-0143", insumo: "IN-02", cantidad: 6,  fecha: daysAgo(3), estado: "Pendiente", motivo: "Pérdida total de enseres de cocina." },
        { id: "SOL-0094", beneficiario: "BEN-0146", insumo: "IN-03", cantidad: 45, fecha: daysAgo(4), estado: "Confirmada",  motivo: "Reubicación: sin camas disponibles." },
        { id: "SOL-0095", beneficiario: "BEN-0145", insumo: "IN-04", cantidad: 4,  fecha: daysAgo(6), estado: "Pendiente", motivo: "Kit de higiene preventivo." },
        { id: "SOL-0096", beneficiario: "BEN-0142", insumo: "IN-01", cantidad: 150, fecha: daysAgo(0), estado: "Pendiente", motivo: "Acueducto veredal fuera de servicio." }
      ],
      despachos: [
        { id: "DES-0031", centro: "CA-01", solicitudes: ["SOL-0094"], estado: "En ruta",    fecha: daysAgo(1), conductor: "Luis Montaño", vehiculo: "Camión TGM-482", items: [{ insumo: "IN-03", cantidad: 45 }] },
        { id: "DES-0030", centro: "CA-01", solicitudes: ["SOL-0091"], estado: "Entregado",  fecha: daysAgo(3), conductor: "Luis Montaño", vehiculo: "Camión TGM-482", items: [{ insumo: "IN-01", cantidad: 600 }] },
        { id: "DES-0029", centro: "CA-03", solicitudes: [],           estado: "Entregado",  fecha: daysAgo(6), conductor: "Pedro Asprilla", vehiculo: "Van HX-119", items: [{ insumo: "IN-08", cantidad: 400 }, { insumo: "IN-02", cantidad: 60 }] }
      ],
      movimientos: [
        { id: "MOV-0201", tipo: "Entrada",  centro: "CA-01", insumo: "IN-01", cantidad: 800, fecha: daysAgo(7), ref: "DON-0118 · Fundación Pacífico", usuario: "Cesar Grain" },
        { id: "MOV-0202", tipo: "Entrada",  centro: "CA-03", insumo: "IN-08", cantidad: 1200, fecha: daysAgo(8), ref: "DON-0117 · Gobernación", usuario: "Cesar Grain" },
        { id: "MOV-0203", tipo: "Salida",   centro: "CA-01", insumo: "IN-01", cantidad: 600, fecha: daysAgo(3), ref: "DES-0030", usuario: "Sistema" },
        { id: "MOV-0204", tipo: "Entrada",  centro: "CA-02", insumo: "IN-06", cantidad: 250, fecha: daysAgo(5), ref: "DON-0119 · Cruz Roja Seccional", usuario: "Cesar Grain" },
        { id: "MOV-0205", tipo: "Salida",   centro: "CA-01", insumo: "IN-03", cantidad: 45,  fecha: daysAgo(1), ref: "DES-0031", usuario: "Sistema" },
        { id: "MOV-0206", tipo: "Entrada",  centro: "CA-01", insumo: "IN-04", cantidad: 300, fecha: daysAgo(2), ref: "DON-0120 · Alcaldía de Buenaventura", usuario: "Cesar Grain" }
      ],
      notificaciones: [
        { id: "N-01", texto: "Stock bajo umbral: Botiquín primeros auxilios (CA-01).", tipo: "warn", tiempo: hoursAgo(2) },
        { id: "N-02", texto: "DES-0031 en ruta: notificación recibida por conducción.", tipo: "ok", tiempo: hoursAgo(20) },
        { id: "N-03", texto: "Nueva solicitud SOL-0096 clasificada ALTA por Resilia.", tipo: "err", tiempo: hoursAgo(5) }
      ],
      seq: { sol: 97, des: 32, mov: 207, don: 121, ben: 147 }
    };
  }

  /* ---------- Store ---------- */
  let db;
  try { db = JSON.parse(localStorage.getItem(KEY)) || seed(); }
  catch (e) { db = seed(); }

  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} }

  /* ---------- Resilia: algoritmo de priorización ----------
     Puntaje 0-100 = 0.35·magnitud + 0.25·vulnerabilidad
                   + 0.25·esencialidad + 0.15·tiempo transcurrido
     Nivel: ALTA ≥ 70 · MEDIA 40-69 · BAJA < 40                     */
  const ESENCIALIDAD = { "Salud": 100, "Alimentos": 90, "Higiene": 60, "Alojamiento": 55 };
  const VULN = { "Alta": 100, "Media": 60, "Baja": 30 };

  function resilia(sol) {
    const ben = db.beneficiarios.find((b) => b.id === sol.beneficiario) || { personas: 10, vulnerabilidad: "Media" };
    const magnitud = Math.min(100, Math.log10(Math.max(ben.personas, 1) * 10) * 33);
    const vuln = VULN[ben.vulnerabilidad] ?? 60;
    const esencia = ESENCIALIDAD[(db.insumos.find((i) => i.id === sol.insumo) || {}).tipo] ?? 50;
    const dias = Math.max(0, (Date.now() - new Date(sol.fecha).getTime()) / 864e5);
    const tiempo = Math.min(100, dias * 25 + 20);
    const score = Math.round(magnitud * 0.35 + vuln * 0.25 + esencia * 0.25 + tiempo * 0.15);
    const nivel = score >= 70 ? "ALTA" : score >= 40 ? "MEDIA" : "BAJA";
    return { score: Math.min(100, score), nivel, magnitud: Math.round(magnitud), vuln, esencia, tiempo: Math.round(tiempo) };
  }

  /* ---------- API pública ---------- */
  window.SICA = {
    db,
    save,
    reset() { db = seed(); save(); },
    session: {
      /* wrappers seguros: algunos navegadores bloquean storage en file:// */
      _mem: {},
      _get(k) { try { return sessionStorage.getItem(k); } catch (e) { return this._mem[k] || null; } },
      _getL(k) { try { return localStorage.getItem(k); } catch (e) { return this._mem[k] || null; } },
      _set(k, v) { this._mem[k] = v; try { sessionStorage.setItem(k, v); } catch (e) {} try { localStorage.setItem(k, v); } catch (e) {} },
      _rm(k) { delete this._mem[k]; try { sessionStorage.removeItem(k); } catch (e) {} try { localStorage.removeItem(k); } catch (e) {} },
      get() { try { return JSON.parse(this._get(SESSION) || this._getL(SESSION)); } catch (e) { return null; } },
      set(u) { this._set(SESSION, JSON.stringify(u)); },
      clear() { this._rm(SESSION); }
    },
    resilia,
    hoy: today,
    /* helpers de dominio */
    centro: (id) => db.centros.find((c) => c.id === id),
    insumo: (id) => db.insumos.find((i) => i.id === id),
    ben: (id) => db.beneficiarios.find((b) => b.id === id),
    estadoStock(e) {
      const r = e.stock / e.umbral;
      if (e.stock <= e.umbral * 0.9) return { label: "CRÍTICO", cls: "pill-danger", color: "var(--danger-400)" };
      if (r < 1.35) return { label: "BAJO", cls: "pill-warn", color: "var(--warn-400)" };
      return { label: "ÓPTIMO", cls: "pill-ok", color: "var(--ok-400)" };
    },
    alertas() {
      return db.existencias.filter((e) => e.stock <= e.umbral * 1.1)
        .map((e) => ({ ...e, insumoObj: SICA.insumo(e.insumo), centroObj: SICA.centro(e.centro) }));
    },
    registrarDonacion({ centro, insumo, cantidad, origen, fecha, usuario }) {
      const e = db.existencias.find((x) => x.centro === centro && x.insumo === insumo);
      if (e) e.stock += cantidad;
      else db.existencias.push({ centro, insumo, stock: cantidad, umbral: Math.round(cantidad * 0.3) });
      const mov = { id: "MOV-0" + db.seq.mov++, tipo: "Entrada", centro, insumo, cantidad, fecha, ref: "DON-0" + db.seq.don++ + " · " + origen, usuario };
      db.movimientos.unshift(mov);
      db.notificaciones.unshift({ id: "N-" + Date.now(), texto: `Entrada registrada: ${cantidad} ${SICA.insumo(insumo).unidad}(s) de ${SICA.insumo(insumo).nombre} en ${SICA.centro(centro).id}.`, tipo: "ok", tiempo: new Date().toISOString() });
      save();
      return mov;
    },
    registrarBeneficiario(data) {
      const b = { id: "BEN-0" + db.seq.ben++, ...data };
      db.beneficiarios.unshift(b); save(); return b;
    },
    registrarSolicitud({ beneficiario, insumo, cantidad, motivo }) {
      const sol = { id: "SOL-00" + db.seq.sol++, beneficiario, insumo, cantidad, fecha: today(), estado: "Pendiente", motivo };
      db.solicitudes.unshift(sol);
      const r = resilia(sol);
      db.notificaciones.unshift({ id: "N-" + Date.now(), texto: `Nueva solicitud ${sol.id} clasificada ${r.nivel} por Resilia (puntaje ${r.score}).`, tipo: r.nivel === "ALTA" ? "err" : r.nivel === "MEDIA" ? "warn" : "ok", tiempo: new Date().toISOString() });
      save();
      return { sol, r };
    },
    confirmarSolicitud(id) {
      const s = db.solicitudes.find((x) => x.id === id);
      if (s) { s.estado = "Confirmada"; save(); }
      return s;
    },
    generarDespacho({ centro, solicitudIds, conductor, vehiculo }) {
      const items = [];
      solicitudIds.forEach((sid) => {
        const s = db.solicitudes.find((x) => x.id === sid);
        if (!s) return;
        const it = items.find((i) => i.insumo === s.insumo);
        if (it) it.cantidad += s.cantidad; else items.push({ insumo: s.insumo, cantidad: s.cantidad });
        s.estado = "En despacho";
      });
      const des = { id: "DES-00" + db.seq.des++, centro, solicitudes: solicitudIds, estado: "Preparando", fecha: today(), conductor, vehiculo, items };
      db.despachos.unshift(des);
      db.notificaciones.unshift({ id: "N-" + Date.now(), texto: `Lista de carga ${des.id} generada: bodega y conducción notificados.`, tipo: "ok", tiempo: new Date().toISOString() });
      save();
      return des;
    },
    avanzarDespacho(id) {
      const d = db.despachos.find((x) => x.id === id);
      if (!d) return null;
      if (d.estado === "Preparando") { d.estado = "En ruta"; }
      else if (d.estado === "En ruta") {
        d.estado = "Entregado";
        d.items.forEach((it) => {
          const e = db.existencias.find((x) => x.centro === d.centro && x.insumo === it.insumo);
          if (e) e.stock = Math.max(0, e.stock - it.cantidad);
          db.movimientos.unshift({ id: "MOV-0" + db.seq.mov++, tipo: "Salida", centro: d.centro, insumo: it.insumo, cantidad: it.cantidad, fecha: today(), ref: d.id, usuario: "Sistema" });
        });
      }
      db.notificaciones.unshift({ id: "N-" + Date.now(), texto: `${d.id} → ${d.estado}.` + (d.estado === "Entregado" ? " Stock descontado en tiempo real." : ""), tipo: "ok", tiempo: new Date().toISOString() });
      save();
      return d;
    },
    stockInsuficiente(centro, items) {
      return items.filter((it) => {
        const e = db.existencias.find((x) => x.centro === centro && x.insumo === it.insumo);
        return !e || e.stock < it.cantidad;
      });
    }
  };
})();
