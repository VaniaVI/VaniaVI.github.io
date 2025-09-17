// 👉 Aquí defines tus productos Tendencias
    const productos = [
      { nombre: "Producto 1", precio: "9.990", descripcion: "Descripción breve del producto 1", imagen: "https://i.pinimg.com/736x/6a/89/48/6a8948b559735c80860cdf2169efc874.jpg" },
      { nombre: "Producto 2", precio: "12.990", descripcion: "Descripción breve del producto 2", imagen: "https://i.pinimg.com/736x/66/37/c3/6637c3eb58091edca0f717094b341e67.jpg" },
      { nombre: "Producto 3", precio: "7.490", descripcion: "Descripción breve del producto 3", imagen: "https://i.pinimg.com/736x/38/9f/6e/389f6e9fb212bd7d46771ead96f90603.jpg" },
      { nombre: "Producto 4", precio: "15.990", descripcion: "Descripción breve del producto 4", imagen: "https://i.pinimg.com/736x/00/07/58/00075847c7272a8fbab818c8d4b3d372.jpg" },
      { nombre: "Producto 4", precio: "15.990", descripcion: "Descripción breve del producto 4", imagen: "https://i.pinimg.com/736x/00/07/58/00075847c7272a8fbab818c8d4b3d372.jpg" }
    
    ];

    // 👉 Contenedor donde van las cards
    const container = document.getElementById("productTrendContainer");

    // 👉 Crear dinámicamente las cards
    productos.forEach(p => {
      const card = `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card custom-card h-100">
            <img src="${p.imagen}" class="card-img-top h-80" alt="${p.nombre}">
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