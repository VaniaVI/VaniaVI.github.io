// ======================================
// Carrito de compras con LocalStorage
// Reglas: mínimo 1 y máximo 10 por producto
// Se puede agregar desde distintas páginas
// ======================================

(() => {
  // Configuración general
  const CLAVE_POR_DEFECTO = 'carritoItems'; // Nombre por defecto en LocalStorage
  const MAXIMO_CANTIDAD   = 10;             // Cantidad máxima permitida por producto

  // Buscar si ya existe una clave de carrito en el navegador,
  // si no, usar la clave por defecto
  function encontrarClaveCarrito() {
    const claves = Object.keys(localStorage);
    return claves.find(k => /carrito/i.test(k)) || CLAVE_POR_DEFECTO;
  }
  let claveCarrito = encontrarClaveCarrito();

  // Funciones de ayuda
  // Atajo para buscar elementos en el HTML
  const seleccionar = (sel, ctx = document) => ctx.querySelector(sel);

  // Dar formato a los números en pesos chilenos
  const formatearCLP = (n) =>
    (Number(n) || 0).toLocaleString('es-CL', {
      style: 'currency', currency: 'CLP', maximumFractionDigits: 0
    });

  // Elementos del carrito en el HTML
  const cuerpoTablaCarrito   = seleccionar('#carritoBody');   // Tabla donde se dibujan los productos
  const subtotalElemento     = seleccionar('#resSubtotal');   // Texto con el subtotal
  const envioElemento        = seleccionar('#resEnvio');      // Texto con el envío
  const totalElemento        = seleccionar('#resTotal');      // Texto con el total
  const selectorMetodoEnvio  = seleccionar('#metodoEnvio');   // Selector de tipo de envío
  const botonVaciar          = seleccionar('#btnVaciar');     // Botón "vaciar carrito"
  const botonPagar           = seleccionar('#btnPagar');      // Botón "pagar"

  // Estado en LocalStorage
  // Leer carrito guardado o devolver vacío si no existe
  function obtenerCarrito() {
    try { return JSON.parse(localStorage.getItem(claveCarrito) || '[]'); }
    catch { return []; }
  }

  // Guardar carrito en LocalStorage en formato JSON
  function guardarCarrito(arr) {
    localStorage.setItem(claveCarrito, JSON.stringify(arr));
  }

  // Calcular costo de envío
  function calcularCostoEnvio() {
    const v = selectorMetodoEnvio?.value;
    if (v === 'normal')  return 3990;
    if (v === 'express') return 6990;
    return 0; // Retiro en tienda
  }

  // Botones de cantidad (+ / -)
  function dibujarBotonesCantidad(id, cant) {
    return `
      <div class="btn-group" role="group">
        <button class="btn btn-sm btn-outline-secondary" data-action="dec" data-id="${id}">−</button>
        <button class="btn btn-sm btn-light disabled">${cant}</button>
        <button class="btn btn-sm btn-outline-secondary" data-action="inc" data-id="${id}">+</button>
      </div>`;
  }

  // Contador en el ícono del carrito
  function actualizarContadorCarrito() {
    // Sumar todas las cantidades del carrito
    const totalItems = obtenerCarrito().reduce((acc, it) => acc + (it.cant || 0), 0);

    // Puede haber más de un contador
    document.querySelectorAll('.badgeCarrito').forEach(b => {
      b.textContent = totalItems;
    });
  }

  // Dibujar carrito en la página
  function mostrarCarrito() {
    const items = obtenerCarrito();
    let html = '';
    let subtotal = 0;

    // Recorremos productos y armamos cada fila de la tabla
    for (const it of items) {
      const cant   = Math.min(Math.max(it.cant || 1, 1), MAXIMO_CANTIDAD); // Validación 1..10
      const precio = Number(it.precio) || 0;
      const st     = precio * cant;
      subtotal    += st;

      html += `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-2">
              ${it.imagen ? `<img src="${it.imagen}" alt="${it.nombre || 'Producto'}" width="48" height="48" class="rounded">` : ''}
              <div>
                <div class="fw-semibold">${it.nombre || 'Producto'}</div>
                <div class="text-muted small">ID: ${it.id || '-'}</div>
              </div>
            </div>
          </td>
          <td class="text-center">${dibujarBotonesCantidad(it.id, cant)}</td>
          <td class="text-end">${formatearCLP(precio)}</td>
          <td class="text-end">${formatearCLP(st)}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-danger" data-action="del" data-id="${it.id}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>`;
    }

    // Si no hay productos se muestra mensaje de carrito vacio
    if (cuerpoTablaCarrito) {
      cuerpoTablaCarrito.innerHTML =
        html || '<tr><td colspan="5" class="text-center text-muted">Tu carrito está vacío</td></tr>';
    }

    // Mostrar subtotales, envío y total
    const envio = calcularCostoEnvio();
    if (subtotalElemento) subtotalElemento.textContent = formatearCLP(subtotal);
    if (envioElemento)    envioElemento.textContent    = formatearCLP(envio);
    if (totalElemento)    totalElemento.textContent    = formatearCLP(subtotal + envio);

    actualizarContadorCarrito();
  }

  // Eventos dentro del carrito: + / − / eliminar producto
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const id     = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');
    const cart   = obtenerCarrito();
    const idx    = cart.findIndex(x => String(x.id) === String(id));
    if (idx === -1) return;

    if (action === 'inc') cart[idx].cant = Math.min(MAXIMO_CANTIDAD, (cart[idx].cant || 1) + 1);
    if (action === 'dec') cart[idx].cant = Math.max(1, (cart[idx].cant || 1) - 1);
    if (action === 'del') cart.splice(idx, 1);

    guardarCarrito(cart);
    mostrarCarrito();
  });

  // Cambiar tipo de envío
  selectorMetodoEnvio && selectorMetodoEnvio.addEventListener('change', mostrarCarrito);

  // Vaciar carrito con confirmación
  botonVaciar && botonVaciar.addEventListener('click', () => {
    if (!confirm('¿Vaciar carrito?')) return;
    guardarCarrito([]);
    mostrarCarrito();
  });

  // Pagar
  botonPagar && botonPagar.addEventListener('click', () => {
    alert('Flujo de pago');
  });

  // Agregar al carrito desde botones en otras páginas
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add-to-cart]');
    if (!add) return;

    const item = {
      id:     add.dataset.id,
      nombre: add.dataset.nombre,
      precio: Number(add.dataset.precio || 0),
      imagen: add.dataset.imagen || '',
      cant:   Number(add.dataset.cant   || 1),
    };

    const cart = obtenerCarrito();
    const idx  = cart.findIndex(x => String(x.id) === String(item.id));

    if (idx >= 0) {
      // Si ya existe el item, se aumenta cantidad hasta el máximo
      cart[idx].cant = Math.min(MAXIMO_CANTIDAD, (cart[idx].cant || 1) + (item.cant || 1));
    } else {
      // Si el item es nuevo, se asegura que quede entre 1 y 10
      item.cant = Math.min(MAXIMO_CANTIDAD, Math.max(1, item.cant || 1));
      cart.push(item);
    }

    guardarCarrito(cart);
    mostrarCarrito();
  });

  // Mostrar carrito al cargar la página
  mostrarCarrito();
})();
