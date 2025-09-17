// Validación alineada a la pauta
// Nombre: requerido, max 100
// Email: requerido, max 100 y solo dominios duoc.cl, profesor.duoc.cl, gmail.com
// Mensaje: requerido, max 500

(() => {
  const form   = document.getElementById('contactoForm');
  const alerta = document.getElementById('alertaForm');
  const chk    = document.getElementById('acepto');
  const chkFb  = document.getElementById('aceptoFeedback');
  if (!form) return;

  // Longitudes y dominios de acuerdo a la pauta
  const MAX_NOMBRE  = 100;
  const MAX_EMAIL   = 100;
  const MIN_MSJ     = 10;
  const MAX_MENSAJE = 500;
  const dominiosOK  = /@(?:duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

  // Campos de la pagina 
  const INP_NOMBRE  = document.getElementById('nombre');
  const INP_EMAIL   = document.getElementById('email');
  const INP_ASUNTO  = document.getElementById('asunto');
  const INP_MENSAJE = document.getElementById('mensaje');

  // Patrón sugerido para nombre
  const NOMBRE_PATTERN = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]{2,100}$/;

  function showAlert(text, type) {
    alerta.className = `alert alert-${type}`;
    alerta.textContent = text;
    alerta.classList.remove('d-none');
  }

  function feedbackEl(input) {
    const col = input.closest('.col-12, .col-md-6, .col-lg-7, .col-lg-5') || input.parentElement;
    return col ? col.querySelector('.invalid-feedback') : null;
  }

  function setValidity(input, ok, msgIfInvalid = "") {
    input.setCustomValidity(ok ? "" : "invalid");
    input.classList.toggle('is-invalid', !ok);
    input.classList.toggle('is-valid', ok);
    const fb = feedbackEl(input);
    if (fb && msgIfInvalid) fb.textContent = msgIfInvalid;
  }

  // Validadores
  function validateNombre() {
    const v = (INP_NOMBRE.value || "").trim();
    if (!v)       { setValidity(INP_NOMBRE, false, "Ingresa tu nombre."); return false; }
    if (v.length > MAX_NOMBRE) { setValidity(INP_NOMBRE, false, `Máximo ${MAX_NOMBRE} caracteres.`); return false; }
    if (!NOMBRE_PATTERN.test(v)) {
      setValidity(INP_NOMBRE, false, "Solo letras, espacios, apóstrofe (') y guión (-).");
      return false;
    }
    setValidity(INP_NOMBRE, true);
    return true;
  }

  function validateEmail() {
    const v = (INP_EMAIL.value || "").trim();
    if (!v)       { setValidity(INP_EMAIL, false, "Ingresa tu correo."); return false; }
    if (v.length > MAX_EMAIL) { setValidity(INP_EMAIL, false, `Máximo ${MAX_EMAIL} caracteres.`); return false; }
    // Validación básica de email del navegador + dominios permitidos
    const nativoOK = INP_EMAIL.checkValidity();
    if (!nativoOK) { setValidity(INP_EMAIL, false, "Formato de correo inválido."); return false; }
    if (!dominiosOK.test(v)) {
      setValidity(INP_EMAIL, false, "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      return false;
    }
    setValidity(INP_EMAIL, true);
    return true;
  }

  function validateAsunto() {
    const v = (INP_ASUNTO.value || "").trim();
    if (!v) { setValidity(INP_ASUNTO, false, "Escribe un asunto."); return false; }
    setValidity(INP_ASUNTO, true);
    return true;
  }

  function validateMensaje() {
    const v = (INP_MENSAJE.value || "").trim();
    if (!v) { setValidity(INP_MENSAJE, false, `El mensaje es requerido (mínimo ${MIN_MSJ}).`); return false; }
    if (v.length < MIN_MSJ) { setValidity(INP_MENSAJE, false, `Mínimo ${MIN_MSJ} caracteres.`); return false; }
    if (v.length > MAX_MENSAJE) { setValidity(INP_MENSAJE, false, `Máximo ${MAX_MENSAJE} caracteres.`); return false; }
    setValidity(INP_MENSAJE, true);
    return true;
  }

  // Validación en tiempo real
  INP_NOMBRE?.addEventListener('input',  validateNombre);
  INP_EMAIL?.addEventListener('input',   validateEmail);
  INP_ASUNTO?.addEventListener('input',  validateAsunto);
  INP_MENSAJE?.addEventListener('input', validateMensaje);
  chk?.addEventListener('change', () => { if (chkFb) chkFb.style.display = chk.checked ? 'none' : 'block'; });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ok =
      validateNombre() &
      validateEmail()  &
      validateAsunto() &
      validateMensaje() &
      (chk?.checked ? 1 : (chkFb && (chkFb.style.display = 'block'), 0));

    // Forzar estilos de Bootstrap si hay errores
    form.classList.add('was-validated');

    if (!ok) {
      showAlert('Por favor, corrige los campos marcados.', 'warning');
      return;
    }

    const fd      = new FormData(form);
    const nombre  = (fd.get('nombre')  || '').trim();
    const email   = (fd.get('email')   || '').trim();
    const asunto  = (fd.get('asunto')  || '').trim();
    const mensaje = (fd.get('mensaje') || '').trim();

    const href = `mailto:soporte@proyecto.cl?subject=${encodeURIComponent(asunto)}%20-%20${encodeURIComponent(nombre)}&body=${encodeURIComponent(mensaje)}%0A%0AContacto:%20${encodeURIComponent(email)}`;
    window.location.href = href;

    showAlert('¡Gracias! Abrimos tu correo para enviar el mensaje.', 'success');
    form.reset();
    form.classList.remove('was-validated');
    // Limpiar campos
    [INP_NOMBRE, INP_EMAIL, INP_ASUNTO, INP_MENSAJE].forEach(el => el?.classList.remove('is-valid', 'is-invalid'));
  });
})();
