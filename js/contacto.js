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

  const MAX_NOMBRE  = 100;
  const MAX_EMAIL   = 100;
  const MAX_MENSAJE = 500;
  const dominiosOK  = /@(?:duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

  function showAlert(text, type) {
    alerta.className = `alert alert-${type}`;
    alerta.textContent = text;
    alerta.classList.remove('d-none');
  }

  function clampLen(val, max) {
    return (val || '').slice(0, max);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fd      = new FormData(form);
    let   nombre  = (fd.get('nombre') || '').trim();
    let   email   = (fd.get('email')  || '').trim();
    let   asunto  = (fd.get('asunto') || '').trim();
    let   mensaje = (fd.get('mensaje')|| '').trim();

    if (!form.checkValidity() || !chk.checked) {
      form.classList.add('was-validated');
      if (chkFb) chkFb.style.display = chk.checked ? 'none' : 'block';
      showAlert('Por favor, corrige los campos marcados.', 'warning');
      return;
    }

    // Longitudes máximas de nombre, mensaje e email
    if (nombre.length > MAX_NOMBRE)  nombre  = clampLen(nombre, MAX_NOMBRE);
    if (email.length  > MAX_EMAIL)   email   = clampLen(email, MAX_EMAIL);
    if (mensaje.length> MAX_MENSAJE) mensaje = clampLen(mensaje, MAX_MENSAJE);

    // Dominio permitido
    if (!dominiosOK.test(email)) {
      showAlert('El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com', 'warning');
      return;
    }

    const href = `mailto:soporte@proyecto.cl?subject=${encodeURIComponent(asunto)}%20-%20${encodeURIComponent(nombre)}&body=${encodeURIComponent(mensaje)}%0A%0AContacto:%20${encodeURIComponent(email)}`;
    window.location.href = href;

    showAlert('¡Gracias! Abrimos tu correo para enviar el mensaje.', 'success');
    form.reset();
    form.classList.remove('was-validated');
  });
})();
