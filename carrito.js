// Maneja el carrito usando localStorage.
// Dibuja la tabla con tus productos
// Permite sumar/restar/eliminar
// Calcula total en CLP

document.addEventListener("DOMContentLoaded", () => {
  // Convertidor de CLP
  const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  // Atajos al DOM 
  const $ = (sel) => document.querySelector(sel);
  const TBODY = $('#cartBody');
  const TOTAL = $('#cartTotal');
  const BTN_CLEAR = $('#btnClear');
  const BTN_CHECKOUT = $('#btnCheckout');

  // --- Helpers de estado (localStorage) ---
  const getCart = () => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); }
    catch { return []; }
  };
  const setCart = (arr) => localStorage.setItem('cart', JSON.stringify(arr));

  // Acepta "9.990" o 9990, y devuelve número
  const toIntPrice = (p) => {
    if (typeof p === 'number') return Math.round(p);
    if (typeof p === 'string') return Number(p.replace(/\./g, '').replace(/[^0-9]/g, '') || 0);
    return 0;
  };

  // Suma total del carrito
  const getTotal = (cart) => cart.reduce((acc, it) => acc + toIntPrice(it.price) * it.qty, 0);

  // Dibuja una fila de producto
  const row = (it) => {
    const price = toIntPrice(it.price);
    return `
      <tr data-key="${it.key}">
        <td>
          <img src="${it.img}" alt="Foto de ${it.name}" width="48" height="48"
               style="object-fit:cover;border-radius:.4rem" />
        </td>
        <td>
          <div class="fw-semibold">${it.name}</div>
        </td>
        <td class="text-end">${CLP.format(price)}</td>
        <td>
          <div class="input-group input-group-sm" style="max-width:140px;">
            <button class="btn btn-outline-secondary" data-act="dec">-</button>
            <input class="form-control text-center" type="number" min="1" value="${it.qty}" data-role="qty">
            <button class="btn btn-outline-secondary" data-act="inc">+</button>
          </div>
        </td>
        <td class="text-end">${CLP.format(price * it.qty)}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-danger" title="Eliminar" data-act="del">
            <span class="material-icons" style="font-size:18px;vertical-align:middle;">delete</span>
          </button>
        </td>
      </tr>
    `;
  };

  // Vuelve a pintar la tabla completa y el total
  function render() {
    const cart = getCart();
    if (cart.length === 0) {
      TBODY.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">Tu carrito está vacío.</td></tr>`;
      TOTAL.textContent = CLP.format(0);
      BTN_CHECKOUT?.setAttribute('disabled', 'true');
      BTN_CLEAR?.setAttribute('disabled', 'true');
      return;
    }

    TBODY.innerHTML = cart.map(row).join('');
    TOTAL.textContent = CLP.format(getTotal(cart));
    BTN_CHECKOUT?.removeAttribute('disabled');
    BTN_CLEAR?.removeAttribute('disabled');
  }

  // Delegación de eventos: click en + / - / eliminar
  TBODY.addEventListener('click', (e) => {
    const tr = e.target.closest('tr[data-key]');
    const btn = e.target.closest('[data-act]');
    if (!tr || !btn) return;

    const key = tr.dataset.key;
    let cart = getCart();
    const i = cart.findIndex(x => x.key === key);
    if (i < 0) return;

    const act = btn.dataset.act;
    if (act === 'inc') cart[i].qty += 1;
    if (act === 'dec') cart[i].qty = Math.max(1, cart[i].qty - 1);
    if (act === 'del') cart.splice(i, 1);

    setCart(cart);
    render();
  });

  // Cambiar cantidad escribiendo en el input
  TBODY.addEventListener('change', (e) => {
    const input = e.target.closest('input[data-role="qty"]');
    if (!input) return;

    const tr = e.target.closest('tr[data-key]');
    const key = tr.dataset.key;

    let cart = getCart();
    const i = cart.findIndex(x => x.key === key);
    if (i < 0) return;

    let val = parseInt(input.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    cart[i].qty = val;

    setCart(cart);
    render();
  });

  // Vaciar carrito (confirmación simple)
  BTN_CLEAR?.addEventListener('click', () => {
    if (!confirm('¿Vaciar carrito?')) return;
    setCart([]);
    render();
  });

  // “Pagar” simulado (para la entrega del ramo basta)
  BTN_CHECKOUT?.addEventListener('click', () => {
    alert('Flujo de pago simulado 🙂');
  });

  // Primera pintada al cargar
  render();
});
