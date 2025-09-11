export const dominiosPermitidos = ["duoc.cl","profesor.duoc.cl","gmail.com"];

export function esEmailValidoDominio(email){
  const m = String(email).toLowerCase().match(/^[^\s@]+@([^\s@]+\.[^\s@]+)$/);
  if(!m) return false;
  const dominio = m[1];
  return dominiosPermitidos.some(d => dominio.endsWith(d));
}

export function validarContacto({ nombre, correo, comentario }){
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
