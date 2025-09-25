// Carrito — LocalStorage + reglas
// Cantidad mínima 1, máxima 10 por producto
// Soporta botones en otras páginas (productos/detalle)

  const DEFAULT_KEY = 'carritoItems';
  const MAX_CANT     = 10;

  // Respeta una clave previa si ya existía algo que contenga "carrito"
  function detectKey() {
    const keys = Object.keys(localStorage);
    return keys.find(k => /carrito/i.test(k)) || DEFAULT_KEY;
  }
  let STORAGE_KEY = detectKey();

  // Utilidades
  const $  = (sel, ctx=document) => ctx.querySelector(sel); // Equivalente a ejemplo: document.querySelector("#miElemento")
  const fmtCLP = (n) => (n ?? 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }); // Cambio de formato de precio a CLP sin decimales

  // Elementos del carrito en HTML
  const tbody       = $('#carritoBody');
  const resSubtotal = $('#resSubtotal');
  const resEnvio    = $('#resEnvio');
  const resTotal    = $('#resTotal');
  const metodoEnvio = $('#metodoEnvio');
  const BTN_CLEAR   = $('#btnVaciar');
  const BTN_PAGAR   = $('#btnPagar');
  const BADGE       = $('#badgeCarrito');

  // Estado en el localStorage
  function getCart() {
    // Lee el carrito guardado y devuelve nada si no hay nada o si algo falló
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  }
  function setCart(arr) {
    // Persiste el carrito como JSON
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); // Si no lo hicieras, el carrito se perdería al recargar o quedaría guardado en un formato que no puedes trabajar.
  }

  // Logica de envio
  function envioPrecio() {
    const v = metodoEnvio?.value;
    if (v === 'normal')  return 3990;
    if (v === 'express') return 6990;
    return 0; // retiro en tienda
  }

  // Botonera de cantidad (renderiza los + / -)
  function cantButtons(id, cant) {
    return `
      <div class="btn-group" role="group">
        <button class="btn btn-sm btn-outline-secondary" data-action="dec" data-id="${id}">−</button>
        <button class="btn btn-sm btn-light disabled">${cant}</button>
        <button class="btn btn-sm btn-outline-secondary" data-action="inc" data-id="${id}">+</button>
      </div>`;
  }

// Badge global (suma todas las cantidades del carrito)
function updateBadge() {
  const totalItems = getCart().reduce((acc, it) => acc + (it.cant || 0), 0);
  // Puede haber varios badges en distintas páginas/navbars
  const BADGES = document.querySelectorAll(".badgeCarrito");  
  BADGES.forEach(badge => {
    badge.textContent = totalItems;
  });
  }

  // Render principal del carrito: pinta filas y totales
  function render() {
    const items = getCart();
    let html = '';
    let subtotal = 0;

    // Recorremos ítems calculando subtotales y armando las filas
    for (const it of items) {
      const cant = Math.min(Math.max(it.cant || 1, 1), MAX_CANT);
      const price = it.precio || 0;
      const st = price * cant;
      subtotal += st;

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
          <td class="text-center">${cantButtons(it.id, cant)}</td>
          <td class="text-end">${fmtCLP(price)}</td>
          <td class="text-end">${fmtCLP(st)}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-danger" data-action="del" data-id="${it.id}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>`;
    }

    // Si no hay items, mostramos mensaje de carrito vacío
    if (tbody) {
      tbody.innerHTML = html || '<tr><td colspan="5" class="text-center text-muted">Tu carrito está vacío</td></tr>';
    }

    // Totales con o sin envio
    const envio = envioPrecio();
    if (resSubtotal) resSubtotal.textContent = fmtCLP(subtotal);
    if (resEnvio)    resEnvio.textContent    = fmtCLP(envio);
    if (resTotal)    resTotal.textContent    = fmtCLP(subtotal + envio);

    updateBadge();
  }

  // Eventos dentro de la tabla del carrito (+ / − / eliminar)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return; // Si el click no fue a un botón de acción, salimos

    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');
    const cart = getCart();
    const idx = cart.findIndex(x => String(x.id) === String(id));
    if (idx === -1) return; // No encontrado (nada que hacer)

    if (action === 'inc') cart[idx].cant = Math.min(MAX_CANT, (cart[idx].cant || 1) + 1); // Validación de cantidad maxima 10
    if (action === 'dec') cart[idx].qtcant = Math.max(1, (cart[idx].cant || 1) - 1); // Validación de cantidad minima 1
    if (action === 'del') cart.splice(idx, 1); // Si por alguna razón el carrito trae un número inválido (ej: 0 o 50), lo corrige automáticamente al mostrarlo, siempre queda entre 1 y 10.

    setCart(cart);
    render(); // Repintamos la UI y totales

  // Cambio de método de envío / recalcula los totales
  metodoEnvio && metodoEnvio.addEventListener('change', render);

  // BOTON Vaciar carrito con confirmación
  BTN_CLEAR && BTN_CLEAR.addEventListener('click', () => {
    if (!confirm('¿Vaciar carrito?')) return; // Validación y confirmación de vaciar carrito 
    setCart([]);
    render();
  });

  // BOTON pagar
  BTN_PAGAR && BTN_PAGAR.addEventListener('click', () => {
    alert('Flujo de pago');
  });

  // Botones "Agregar al carrito" en otras páginas
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add-to-cart]');
    if (!add) return;

    // Tomamos los datos desde data-attributes del botón
    const item = {
      id: add.dataset.id,
      nombre: add.dataset.nombre,
      precio: add.dataset.precio || 0,
      imagen: add.dataset.imagen || '',
      cant: Number(add.dataset.cant || 1)
    };

    const cart = getCart();
    const idx = cart.findIndex(x => String(x.id) === String(item.id));
    if (idx >= 0) {
      // Si ya existe sumamos respetando el tope
      cart[idx].cant = Math.min(MAX_CANT, (cart[idx].cant || 1) + (item.cant || 1));
    } else {
      // Si es nuevo normalizamos la cantidad 1/10
      item.cant = Math.min(MAX_CANT, Math.max(1, item.cant || 1));
      cart.push(item);
    }
    setCart(cart);
    render();
  });

  // Renderizado inicial al cargar la pagina
  render();
})();
