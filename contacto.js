document.addEventListener("DOMContentLoaded", () => {
  // Dominios válidos
  const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

  // Atajos
  const $ = s => document.querySelector(s);
  const f           = $("#f");
  const nombre      = $("#nombre");
  const correo      = $("#correo");
  const comentario  = $("#comentario");
  const errNombre   = $("#err-nombre");
  const errCorreo   = $("#err-correo");
  const errComentario = $("#err-comentario");
  const ok          = $("#ok");

  const cntNombre   = $("#cnt-nombre");
  const cntCorreo   = $("#cnt-correo");
  const cntComentario = $("#cnt-comentario");

  // Valida dominio exacto del correo / Trim evita que espacios rompan la validación
  function dominioEmail(email){
    const m = String(email).trim().toLowerCase().match(/^[^\s@]+@([^\s@]+)$/);
    return m ? m[1] : null;
  }
  function esDominioPermitido(email){
    const d = dominioEmail(email);
    if(!d) return false;
    // Dominio exacto 
    return DOMINIOS_PERMITIDOS.includes(d);
  }

  // Validador central del correo / Trim evita que espacios rompan la validación
  function validar({ nombre, correo, comentario }){
    const e = {};
    const n = (nombre ?? "").trim();
    const c = (correo ?? "").trim();
    const m = (comentario ?? "").trim();

    // Nombre
    if(!n) e.nombre = "Nombre requerido";
    else if(n.length > 100) e.nombre = "Máx 100 caracteres";

    // Correo de maximo 100 caracteres
    if(c){ // Si no está vacío, validamos
      if(c.length > 100) e.correo = "Máx 100 caracteres";
      else if(!esDominioPermitido(c)) e.correo = "Dominio no permitido (usa duoc.cl, profesor.duoc.cl o gmail.com)";
    }

    // Comentario maximo de 500 caracteres
    if(!m) e.comentario = "Comentario requerido";
    else if(m.length > 500) e.comentario = "Máx 500 caracteres";

    return e;
  }

  // Aplica/quita errores visuales
  function pintarErrores(e){
    errNombre.textContent     = e.nombre     || "";
    errCorreo.textContent     = e.correo     || "";
    errComentario.textContent = e.comentario || "";

    const set = (input, hasErr, ids) => {
      input.classList.toggle("is-invalid", !!hasErr);
      input.setAttribute("aria-invalid", hasErr ? "true" : "false");
      if(ids) input.setAttribute("aria-describedby", ids);
    };

    set(nombre,     e.nombre,     "err-nombre cnt-nombre");
    set(correo,     e.correo,     "err-correo cnt-correo");
    set(comentario, e.comentario, "err-comentario cnt-comentario");
  }

  // Contadores
  function updateCounts(){
    cntNombre.textContent    = `${nombre.value.length}/100`;
    cntCorreo.textContent    = `${correo.value.length}/100`;
    cntComentario.textContent= `${comentario.value.length}/500`;
  }

  // Cada vez que el usuario escribe en un campo
  // Se actualizan los contadores y se ejecuta la validación
  // Así el usuario ve de inmediato si cumple con las reglas
  [nombre, correo, comentario].forEach(input=>{
    input.addEventListener("input", ()=>{
      updateCounts();
      const errs = validar({
        nombre: nombre.value,
        correo: correo.value,
        comentario: comentario.value
      });
      pintarErrores(errs);
    });
  });
  updateCounts();

  // Envío
  f.addEventListener("submit", (ev)=>{
    ev.preventDefault();

    const datos = {
      nombre: nombre.value,
      correo: correo.value,
      comentario: comentario.value
    };
    const errs = validar(datos);
    pintarErrores(errs);

    if(Object.keys(errs).length === 0){
      // Simulación de envío OK
      ok.textContent = "¡Mensaje enviado!";
      // Limpieza visual
      f.reset();
      [nombre, correo, comentario].forEach(i => {
        i.classList.remove("is-invalid","is-valid");
        i.setAttribute("aria-invalid","false");
      });
      updateCounts();
      setTimeout(()=> ok.textContent = "", 2500);
    }
  });
});
