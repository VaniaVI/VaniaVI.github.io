  // 👉 Aquí defines tus productos
    const productos = [
      { nombre: "Producto 1", precio: "9.990", descripcion: "Descripción breve del producto 1", imagen: "https://via.placeholder.com/300x200" },
      { nombre: "Producto 2", precio: "12.990", descripcion: "Descripción breve del producto 2", imagen: "https://via.placeholder.com/300x200" },
      { nombre: "Producto 3", precio: "7.490", descripcion: "Descripción breve del producto 3", imagen: "https://via.placeholder.com/300x200" },
      { nombre: "Producto 4", precio: "15.990", descripcion: "Descripción breve del producto 4", imagen: "https://via.placeholder.com/300x200" }
    ];

    // 👉 Contenedor donde van las cards
    const container = document.getElementById("productContainer");

    // 👉 Crear dinámicamente las cards
    productos.forEach(p => {
      const card = `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card custom-card h-100">
            <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${p.nombre}</h5>
              <p class="card-text text-muted">${p.descripcion}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="price">$${p.precio}</span>
                <button class="btn btn-sm btn-primary">Agregar</button>
              </div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });