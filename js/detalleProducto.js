// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const prodid = params.get("prodid");
const categoria = params.get("cat");

// Importar productos desde otro archivo
import { productos } from "./productos.js";

//cambiar formato de precio
const fmtCLP = (n) => (n ?? 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

// Buscar y mostrar el producto
function mostrarProducto(id, categoria) {
  const producto = productos.find(p => p.id === Number(id));

  if (!producto) {
    document.querySelector(".producto-detalle").innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  // Mostrar datos del producto
  document.getElementById("tituloProducto").textContent = producto.nombre;
  document.getElementById("precioProducto").textContent = fmtCLP(producto.precio);
  document.getElementById("descripcionProducto").textContent = producto.descripcion;
  document.getElementById("imagenPrincipal").src = producto.imagen;
  document.getElementById("categoriaProducto").textContent = categoria || "Sin categoría";
  document.getElementById("tituloProductoBreadcrumb").textContent = producto.nombre || "Producto";


  //Agregar productos al carrito
  document.getElementById("btnAgregar").addEventListener("click", () => {
  const cantidad = Math.min(10, Math.max(1, Number(document.getElementById("cantidad").value)));
  const producto = productos.find(p => p.id === Number(id));

  if (!producto) return;

  const item = {
    id: producto.id,
    nombre: producto.nombre,
    precio: Number(producto.precio),
    imagen: producto.imagen,
    cant: cantidad
  };

  const STORAGE_KEY = 'carritoItems';
  const cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const idx = cart.findIndex(x => String(x.id) === String(item.id));

  if (idx >= 0) {
    cart[idx].cant = Math.min(10, cart[idx].cant + item.cant);
  } else {
    cart.push(item);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  alert(`Se agregó ${item.cant} unidad(es) de "${item.nombre}" al carrito`);
});


  // Mostrar productos relacionados
  mostrarRelacionados(producto, categoria);
}

// Mostrar productos relacionados
function mostrarRelacionados(productoActual, categoria) {
  const relacionadosContainer = document.getElementById("relacionados");

  const relacionados = productos.filter(p =>
    p.id !== productoActual.id && p.categoria === categoria
  );

  if (relacionados.length === 0) {
    relacionadosContainer.innerHTML = "<p>No hay productos relacionados.</p>";
    return;
  }

  relacionados.forEach(p => {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4 col-lg-3";
    card.innerHTML = `
      <div class="card h-100">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.nombre}</h5>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <span class="price">${fmtCLP(p.precio)}</span>
            <a href="/detalleProducto.html?prodid=${p.id}&cat=${p.categoria}" class="btn btn-sm btn-primary">Ver detalle</a>
          </div>
        </div>
      </div>
    `;
    relacionadosContainer.appendChild(card);
  });
}

// Activar miniaturas
function activarMiniaturas() {
  document.querySelectorAll('#miniaturas img').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('imagenPrincipal').src = img.src;
    });
  });
}

// Generar enlaces de prueba (solo si existe el contenedor)
function generarEnlacesDePrueba() {
  const enlacesContainer = document.getElementById("enlacesDePrueba");
  if (!enlacesContainer) return;

  productos.forEach(p => {
    const link = document.createElement("a");
    link.href = `detalleProducto.html?prodid=${p.id}&cat=${p.categoria}`;
    link.textContent = `Ver ${p.nombre}`;
    link.classList.add("d-block", "mb-2");
    enlacesContainer.appendChild(link);
  });
}

// Ejecutar funciones
mostrarProducto(prodid, categoria);
activarMiniaturas();
generarEnlacesDePrueba();