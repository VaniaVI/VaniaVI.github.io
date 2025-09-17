
const productos = [
  { nombre: "Collar de cuero", categoria: "accesorios", precio: "9.990", descripcion: "Para perros grandes", imagen: "https://ae-pic-a1.aliexpress-media.com/kf/Sc812fa59a89542cba4fdfb73c394ea06R.jpg_960x960q75.jpg_.avif" },
  { nombre: "Comida premium", categoria: "alimentos", precio: "12.990", descripcion: "Nutrición completa", imagen: "https://www.superzoo.cl/on/demandware.static/-/Sites-SuperZoo-master-catalog/default/dwe8e129cd/images/44_m.jpg" },
  { nombre: "Contenedor de comida y agua", categoria: "accesorios", precio: "7.490", descripcion: "Estimula el juego", imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S6abf1509215e4a4fa3fcf63d70d6d091T.jpg_960x960q75.jpg_.avif" },
  { nombre: "Snack saludable", categoria: "alimentos", precio: "15.990", descripcion: "Sin colorantes", imagen: "https://www.superzoo.cl/on/demandware.static/-/Sites-SuperZoo-master-catalog/default/dwdd89c052/images/sku14881_1.jpg" },
  { nombre: "Pack de ofertas", categoria: "ofertas especiales", precio: "19.990", descripcion: "Combo especial", imagen: "https://i.pinimg.com/736x/6a/89/48/6a8948b559735c80860cdf2169efc874.jpg" }
];


const container = document.getElementById("productContainer");

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
                <span class="price">$${p.precio}</span>
                <a href="detalleProducto.html" class="btn btn-sm btn-primary">Ver detalle</a>
              </div>
            </div>
          </div>
        </div>
    `;
  container.innerHTML += card;
});

