//MODAL Inicio sesion
document.addEventListener("DOMContentLoaded", () => {
  // Evitamos duplicar si ya existe
  if (!document.getElementById("exampleModal")) {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Bienvenido a <span class="text-uppercase fw-bold">PetSocity</span></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <form id="formLogin" class="needs-validation d-flex flex-column gap-3" >
                <div class="w-100">
                  <label for="validationCustomEmail" class="form-label">Correo electrónico</label>
                  <div class="input-group has-validation">
                    <input type="email" class="form-control" id="validationCustomEmail" required
                      pattern="^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$"
                      title="Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com"
                      placeholder="phillips@duoc.cl"/>
                    <div class="invalid-feedback">Por favor ingrese un correo válido con @duoc.cl, @profesor.duoc.cl o @gmail.com.</div>
                  </div>
                </div>
                <div class="w-100 mt-3">
                  <label for="validationCustomPassword" class="form-label">Contraseña</label>
                  <div class="input-group has-validation">
                    <input type="password" class="form-control" id="validationCustomPassword" required minlength="4" maxlength="10"
                      title="La contraseña debe tener entre 4 y 10 caracteres, una mayúscula, una minúscula, un número y un símbolo especial"
                      placeholder="contra123@" />
                    <div class="invalid-feedback">Por favor ingresa tu contraseña (mínimo 4, máximo 10 caracteres).</div>
                  </div>
                </div>
                <div id="loginError" class="text-danger d-none">Usuario o contraseña incorrectos.</div>
                <div class="d-flex justify-content-center mt-3">
                  <button class="btn btn-primary" type="submit">Iniciar sesión</button>
                </div>
                <div class="text-center mt-2">
                  <a href="#" data-bs-toggle="modal" data-bs-target="#modalRecuperar" style="text-decoration: none;">¿Olvidaste tu contraseña?</a>
                </div>
                <div class="text-center">
                  <a href="../registroUsuario.html" data-bs-toggle="modal" style="text-decoration: none;">
                    ¿No tienes cuenta? Regístrate
                  </a>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");

  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();

      const correo = document.getElementById("validationCustomEmail").value.trim();

      // Simulación de login válido
      if (correo === "admin@gmail.com") {
        localStorage.setItem("usuarioActivo", correo);
        window.location.href = "/homeAdmin.html";
      } else {
        localStorage.setItem("usuarioActivo", correo);
        window.location.href = "/index.html";
      }
    });
  }
});


