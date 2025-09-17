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


  
  
  
  
  
  // 👉 Aquí defines tus productos
    const productos = [
      { nombre: "Producto 1", precio: "9.990", descripcion: "Descripción breve del producto 1", imagen: "https://i.pinimg.com/736x/6a/89/48/6a8948b559735c80860cdf2169efc874.jpg" },
      { nombre: "Producto 2", precio: "12.990", descripcion: "Descripción breve del producto 2", imagen: "https://i.pinimg.com/736x/66/37/c3/6637c3eb58091edca0f717094b341e67.jpg" },
      { nombre: "Producto 3", precio: "7.490", descripcion: "Descripción breve del producto 3", imagen: "https://i.pinimg.com/736x/38/9f/6e/389f6e9fb212bd7d46771ead96f90603.jpg" },
      { nombre: "Producto 4", precio: "15.990", descripcion: "Descripción breve del producto 4", imagen: "https://i.pinimg.com/736x/00/07/58/00075847c7272a8fbab818c8d4b3d372.jpg" },
      { nombre: "Producto 4", precio: "15.990", descripcion: "Descripción breve del producto 4", imagen: "https://i.pinimg.com/736x/00/07/58/00075847c7272a8fbab818c8d4b3d372.jpg" }
    
    ];

    // 👉 Contenedor donde van las cards
    const container = document.getElementById("productContainer");

    // 👉 Crear dinámicamente las cards
    productos.forEach(p => {
      const card = `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card custom-card h-10">
            <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${p.nombre}</h5>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="price">$${p.precio}</span>
                <a href="detalleProducto.html" class="btn btn-sm btn-primary">Ver detalle</a>
              </div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });