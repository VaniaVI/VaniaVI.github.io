//Validacion campos vacios
(() => {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');
  const mascotasContainer = document.getElementById('mascotasContainer');
  const agregarBtn = document.getElementById('agregarMascota');
  const plantilla = document.getElementById('plantillaMascota');

  let contadorMascotas = 0;

  // Añadir nueva mascota desde plantilla HTML
  if (agregarBtn && mascotasContainer && plantilla) {
    agregarBtn.addEventListener('click', () => {
      contadorMascotas++;

      const nuevaMascota = plantilla.firstElementChild.cloneNode(true);
      nuevaMascota.setAttribute('id', `mascota-${contadorMascotas}`);

      // Activar botón de eliminar
      const btnEliminar = nuevaMascota.querySelector('.eliminar-mascota');
      if (btnEliminar) {
        btnEliminar.addEventListener('click', () => {
          nuevaMascota.remove();
        });
      }

      mascotasContainer.insertBefore(nuevaMascota, mascotasContainer.firstChild);
    });
  }

  // Validación de formularios
  Array.from(forms).forEach(form => {
    const passwordInput = form.querySelector('#password');
    const confirmInput = form.querySelector('#verificarPassword');

    // Validación en tiempo real de coincidencia
    if (confirmInput) {
      confirmInput.addEventListener('input', () => {
        const password = passwordInput.value.trim();
        const confirm = confirmInput.value.trim();

        if (password !== confirm) {
          confirmInput.setCustomValidity("Las contraseñas no coinciden");
        } else {
          confirmInput.setCustomValidity("");
        }
      });
    }

    form.addEventListener('submit', event => {
      const password = passwordInput.value.trim();
      const confirmPassword = confirmInput.value.trim();

      // Validación de seguridad
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&!^*])[A-Za-z\d@#$%&!^*]{8,}$/;

      if (!regex.test(password)) {
        passwordInput.setCustomValidity("La contraseña no cumple con los requisitos");
      } else {
        passwordInput.setCustomValidity("");
      }

      // Validación de coincidencia
      if (password !== confirmPassword) {
        confirmInput.setCustomValidity("Las contraseñas no coinciden");
      } else {
        confirmInput.setCustomValidity("");
      }

      // Validación general
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    });
  });
})();
//fin validacion campos vacios
