import { validarContacto } from "./validators.js";

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

function updateCounts(){
  cntNombre.textContent = `${nombre.value.length}/100`;
  cntCorreo.textContent = `${correo.value.length}/100`;
  cntComentario.textContent = `${comentario.value.length}/500`;
}
["input","keyup"].forEach(evt=>{
  nombre.addEventListener(evt, updateCounts);
  correo.addEventListener(evt, updateCounts);
  comentario.addEventListener(evt, updateCounts);
});
updateCounts();

function pintarErrores(e){
  // textos
  errNombre.textContent = e.nombre || "";
  errCorreo.textContent = e.correo || "";
  errComentario.textContent = e.comentario || "";
  // clases Bootstrap
  nombre.classList.toggle("is-invalid", !!e.nombre);
  correo.classList.toggle("is-invalid", !!e.correo);
  comentario.classList.toggle("is-invalid", !!e.comentario);
}

[nombre, correo, comentario].forEach(input=>{
  input.addEventListener("input", ()=>{
    const errs = validarContacto({
      nombre: nombre.value,
      correo: correo.value,
      comentario: comentario.value
    });
    pintarErrores(errs);
  });
});

f.addEventListener("submit", (e)=>{
  e.preventDefault();
  const datos = {
    nombre: nombre.value,
    correo: correo.value,
    comentario: comentario.value
  };
  const errs = validarContacto(datos);
  pintarErrores(errs);
  if(Object.keys(errs).length === 0){
    // Simulación de envío; si quieren, pueden guardar en localStorage para demo
    f.reset();
    updateCounts();
    ok.textContent = "¡Mensaje enviado!";
    setTimeout(()=> ok.textContent="", 2500);
  }
});
