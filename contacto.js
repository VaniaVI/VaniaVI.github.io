document.addEventListener("DOMContentLoaded", () => {
  const dominiosPermitidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

  const f = document.querySelector("#f");
  const nombre = document.querySelector("#nombre");
  const correo = document.querySelector("#correo");
  const comentario = document.querySelector("#comentario");
  const errNombre = document.querySelector("#err-nombre");
  const errCorreo = document.querySelector("#err-correo");
  const errComentario = document.querySelector("#err-comentario");
  const ok = document.querySelector("#ok");

  const cntNombre = document.querySelector("#cnt-nombre");
  const cntCorreo = document.querySelector("#cnt-correo");
  const cntComentario = document.querySelector("#cnt-comentario");

  function esEmailValidoDominio(email){
    const m = String(email).toLowerCase().match(/^[^\s@]+@([^\s@]+\.[^\s@]+)$/);
    if(!m) return false;
    const dominio = m[1];
    return dominiosPermitidos.some(d => dominio.endsWith(d));
  }

  function validar({ nombre, correo, comentario }){
    const e = {};
    if(!nombre?.trim()) e.nombre = "Nombre requerido";
    else if(nombre.length > 100) e.nombre = "Máx 100 caracteres";

    if(correo){
      if(correo.length > 100) e.correo = "Máx 100 caracteres";
      else if(!esEmailValidoDominio(correo)) e.correo = "Dominio no permitido";
    }

    if(!comentario?.trim()) e.comentario = "Comentario requerido";
    else if(comentario.length > 500) e.comentario = "Máx 500 caracteres";

    return e;
  }

  function pintarErrores(e){
    errNombre.textContent = e.nombre || "";
    errCorreo.textContent = e.correo || "";
    errComentario.textContent = e.comentario || "";

    nombre.classList.toggle("is-invalid", !!e.nombre);
    correo.classList.toggle("is-invalid", !!e.correo);
    comentario.classList.toggle("is-invalid", !!e.comentario);
  }

  function updateCounts(){
    cntNombre.textContent = `${nombre.value.length}/100`;
    cntCorreo.textContent = `${correo.value.length}/100`;
    cntComentario.textContent = `${comentario.value.length}/500`;
  }

  [nombre, correo, comentario].forEach(input=>{
    input.addEventListener("input", ()=>{
      updateCounts();
      const errs = validar({ nombre:nombre.value, correo:correo.value, comentario:comentario.value });
      pintarErrores(errs);
    });
  });
  updateCounts();

  f.addEventListener("submit", (e)=>{
    e.preventDefault();
    const datos = { nombre:nombre.value, correo:correo.value, comentario:comentario.value };
    const errs = validar(datos);
    pintarErrores(errs);
    if(Object.keys(errs).length === 0){
      f.reset();
      updateCounts();
      ok.textContent = "¡Mensaje enviado!";
      setTimeout(()=> ok.textContent = "", 2500);
    }
  });
});
