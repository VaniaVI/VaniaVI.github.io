import { productos } from "./productos.js";
const container = document.getElementById("productContainer");

//cambiar formato de precio
const fmtCLP = (n) => (n ?? 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });


// 👉 Leer parámetro de la URL
const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria") || "todos";

// 👉 Filtrar productos según categoría
const productosFiltrados = categoria === "todos"
  ? productos
  : productos.filter(p => p.categoria === categoria);

// 👉 Renderizar las cards
productosFiltrados.forEach(p => {
    const titulo = document.querySelector("h2");
        if (categoria !== "todos") {
          titulo.textContent = `${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`;
        }
    const card = `
        <div class="col-sm-6 col-md-4 col-lg-3 d-flex">
          <div class="card custom-card h-100 w-100">
            <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title ">${p.nombre}</h5>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="price">${fmtCLP(p.precio)}</span>
                <a href="detalleProducto.html?prodid=${p.id}&cat=${p.categoria}" class="btn btn-sm btn-primary">Ver detalle</a>
              </div>
            </div>
          </div>
        </div>
    `;
  container.innerHTML += card;
});
