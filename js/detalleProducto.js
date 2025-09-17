// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const prodid = params.get("prodid");
const categoria = params.get("cat");

// Simulación de productos locales
const productos = [
  {
    id: "1",
    nombre: "Producto 1",
    precio: "9.990",
    descripcion: "Descripción breve del producto 1",
    imagen: "https://i.pinimg.com/736x/6a/89/48/6a8948b559735c80860cdf2169efc874.jpg"
  },
  {
    id: "2",
    nombre: "Producto 2",
    precio: "12.990",
    descripcion: "Descripción breve del producto 2",
    imagen: "https://i.pinimg.com/736x/66/37/c3/6637c3eb58091edca0f717094b341e67.jpg"
  },
  {
    id: "3",
    nombre: "Producto 3",
    precio: "7.490",
    descripcion: "Descripción breve del producto 3",
    imagen: "https://i.pinimg.com/736x/38/9f/6e/389f6e9fb212bd7d46771ead96f90603.jpg"
  },
  {
    id: "4",
    nombre: "Producto 4",
    precio: "15.990",
    descripcion: "Descripción breve del producto 4",
    imagen: "https://i.pinimg.com/736x/00/07/58/00075847c7272a8fbab818c8d4b3d372.jpg"
  }
];

// Buscar y mostrar el producto
function mostrarProducto(id, categoria) {
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    document.querySelector(".producto-detalle").innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  document.getElementById("tituloProducto").textContent = producto.nombre;
  document.getElementById("precioProducto").textContent = `$${producto.precio}`;
  document.getElementById("descripcionProducto").textContent = producto.descripcion;
  document.getElementById("imagenPrincipal").src = producto.imagen;
  document.getElementById("categoriaProducto").textContent = categoria || "Sin categoría";
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