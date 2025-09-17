// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const prodid = params.get("prodid");
const categoria = params.get("cat");

// Simulación de productos locales los importa desde otro js
import { productos } from "./productos.js";

// Buscar y mostrar el producto
function mostrarProducto(id, categoria) {
  const producto = productos.find(p => p.id === Number(id));

  if (!producto) {
    document.querySelector(".producto-detalle").innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  document.getElementById("tituloProducto").textContent = producto.nombre;
  document.getElementById("precioProducto").textContent = `$${producto.precio}`;
  document.getElementById("descripcionProducto").textContent = producto.descripcion;
  console.log("Imagen cargada:", producto.imagen);

  document.getElementById("imagenPrincipal").src = producto.imagen;
  console.log("Imagen no cargada:", producto.imagen);

  document.getElementById("categoriaProducto").textContent = categoria || "Sin categoría";
  document.getElementById("tituloProductoBreadcrumb").textContent = producto.nombre || "Producto"
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
    link.href = `detalleProducto.html?prodid=${p.id}&cat=juguetes`;
    link.textContent = `Ver ${p.nombre}`;
    link.classList.add("d-block", "mb-2");
    enlacesContainer.appendChild(link);
  });
}

// Ejecutar funciones
mostrarProducto(prodid, categoria);
activarMiniaturas();
generarEnlacesDePrueba();