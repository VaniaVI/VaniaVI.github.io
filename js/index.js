import { productos } from "./productos.js";
// 👉 Contenedor donde van las cards
const container = document.getElementById("productTrendContainer");
    
const productosTendencias = productos.filter(p => p.filtro === "tendencias")

// 👉 Crear dinámicamente las cards
if (productosTendencias.length === 0) {
  container.innerHTML="<p>No hay productos en tendencia en estos momentos</p>";
}else{
  productosTendencias.forEach(p => {
    const card = `
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card custom-card h-100">
          <img src="${p.imagen}" class="card-img-top h-80" alt="${p.nombre}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.nombre}</h5>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="price">$${p.precio}</span>
               <a href="detalleProducto.html?prodid=${p.id}&cat=${p.categoria}" class="btn btn-sm btn-primary">Ver detalle</a>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}
