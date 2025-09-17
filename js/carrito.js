// Carrito — LocalStorage + reglas
// Cantidad mínima 1, máxima 10 por producto
// Soporta botones en otras páginas (productos/detalle)

(() => {
  const DEFAULT_KEY = 'carritoItems';
  const MAX_QTY     = 10;

  // Intento respetar una clave previa si ya existía algo que contenga "carrito"
  function detectKey() {
    const keys = Object.keys(localStorage);
    return keys.find(k => /carrito/i.test(k)) || DEFAULT_KEY;
  }
  let STORAGE_KEY = detectKey();

  // Utilidades
  const $  = (sel, ctx=document) => ctx.querySelector(sel);
  const fmtCLP = (n) => (n ?? 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  // DOM
  const tbody       = $('#carritoBody');
  const resSubtotal = $('#resSubtotal');
  const resEnvio    = $('#resEnvio');
  const resTotal    = $('#resTotal');
  const metodoEnvio = $('#metodoEnvio');
  const BTN_CLEAR   = $('#btnVaciar');
  const BTN_PAGAR   = $('#btnPagar');
  const BADGE       = $('#badgeCarrito');

  // Estado
  function getCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  }
  function setCart(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  function envioPrecio() {
    const v = metodoEnvio?.value;
    if (v === 'normal')  return 3990;
    if (v === 'express') return 6990;
    return 0; // retiro
  }

  function qtyButtons(id, qty) {
    return `
      <div class="btn-group" role="group">
        <button class="btn btn-sm btn-outline-secondary" data-action="dec" data-id="${id}">−</button>
        <button class="btn btn-sm btn-light disabled">${qty}</button>
        <button class="btn btn-sm btn-outline-secondary" data-action="inc" data-id="${id}">+</button>
      </div>`;
  }

  function updateBadge() {
    if (!BADGE) return;
    const totalItems = getCart().reduce((acc, it) => acc + (it.qty || 0), 0);
    BADGE.textContent = totalItems;
  }

  function render() {
    const items = getCart();
    let html = '';
    let subtotal = 0;

    for (const it of items) {
      const qty = Math.min(Math.max(it.qty || 1, 1), MAX_QTY);
      const price = Number(it.precio || 0);
      const st = price * qty;
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
          <td class="text-center">${qtyButtons(it.id, qty)}</td>
          <td class="text-end">${fmtCLP(price)}</td>
          <td class="text-end">${fmtCLP(st)}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-danger" data-action="del" data-id="${it.id}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>`;
    }

    if (tbody) {
      tbody.innerHTML = html || '<tr><td colspan="5" class="text-center text-muted">Tu carrito está vacío</td></tr>';
    }

    const envio = envioPrecio();
    if (resSubtotal) resSubtotal.textContent = fmtCLP(subtotal);
    if (resEnvio)    resEnvio.textContent    = fmtCLP(envio);
    if (resTotal)    resTotal.textContent    = fmtCLP(subtotal + envio);

    updateBadge();
  }

  // Eventos
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');
    const cart = getCart();
    const idx = cart.findIndex(x => String(x.id) === String(id));
    if (idx === -1) return;

    if (action === 'inc') cart[idx].qty = Math.min(MAX_QTY, (cart[idx].qty || 1) + 1);
    if (action === 'dec') cart[idx].qty = Math.max(1, (cart[idx].qty || 1) - 1);
    if (action === 'del') cart.splice(idx, 1);

    setCart(cart);
    render();
  });

  metodoEnvio && metodoEnvio.addEventListener('change', render);

  BTN_CLEAR && BTN_CLEAR.addEventListener('click', () => {
    if (!confirm('¿Vaciar carrito?')) return;
    setCart([]);
    render();
  });

  BTN_PAGAR && BTN_PAGAR.addEventListener('click', () => {
    alert('Flujo de pago');
  });

  // Botones "Agregar al carrito" en otras páginas
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add-to-cart]');
    if (!add) return;

    const item = {
      id: add.dataset.id,
      nombre: add.dataset.nombre,
      precio: Number(add.dataset.precio || 0),
      imagen: add.dataset.imagen || '',
      qty: Number(add.dataset.qty || 1)
    };

    const cart = getCart();
    const idx = cart.findIndex(x => String(x.id) === String(item.id));
    if (idx >= 0) {
      cart[idx].qty = Math.min(MAX_QTY, (cart[idx].qty || 1) + (item.qty || 1));
    } else {
      item.qty = Math.min(MAX_QTY, Math.max(1, item.qty || 1));
      cart.push(item);
    }
    setCart(cart);
    render();
  });

  render();
})();
