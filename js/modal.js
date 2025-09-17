//MODAL Inicio sesion
document.addEventListener("DOMContentLoaded", () => {
  // Evitamos duplicar si ya existe
  if (!document.getElementById("exampleModal")) {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Bienvenido a PetSocity</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <form class="needs-validation d-flex flex-column gap-3" novalidate>
                <div class="w-100">
                  <label for="validationCustomEmail" class="form-label">Correo electrónico</label>
                  <div class="input-group has-validation">
                    <input type="email" class="form-control" id="validationCustomEmail" required
                      pattern="^[a-zA-Z0-9._%+-]+@duoc\\.cl$"
                      title="Debe ser un correo válido con dominio @duoc.cl"
                      placeholder="phillips@duocuc.cl"/>
                    <div class="invalid-feedback">Por favor ingrese su correo electrónico.</div>
                  </div>
                </div>
                <div class="w-100 mt-3">
                  <label for="validationCustomPassword" class="form-label">Contraseña</label>
                  <div class="input-group has-validation">
                    <input type="password" class="form-control" id="validationCustomPassword" required minlength="8"
                      title="Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial"
                      placeholder="contra123@" />
                    <div class="invalid-feedback">Por favor ingresa tu contraseña.</div>
                  </div>
                </div>
                <div id="loginError" class="text-danger d-none">Usuario o contraseña incorrectos.</div>
                <div class="d-flex justify-content-center mt-3">
                  <button class="btn btn-primary" type="submit">Iniciar sesión</button>
                </div>
                <div class="text-center mt-2">
                  <a href="#" data-bs-toggle="modal" data-bs-target="#modalRecuperar">¿Olvidaste tu contraseña?</a>
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