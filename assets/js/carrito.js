const CLAVE_CARRITO = "milSaboresCarrito";

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function formatoPrecio(valor) {
  return valor.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  });
}

function agregarAlCarrito(producto, cantidad = 1) {
  const carrito = obtenerCarrito();
  const productoExistente = carrito.find(item => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad
    });
  }

  guardarCarrito(carrito);
}

function eliminarDelCarrito(idProducto) {
  const carritoActualizado = obtenerCarrito().filter(item => item.id !== idProducto);
  guardarCarrito(carritoActualizado);
  renderizarCarrito();
}

function cambiarCantidad(idProducto, nuevaCantidad) {
  const carrito = obtenerCarrito();
  const producto = carrito.find(item => item.id === idProducto);

  if (!producto) return;

  producto.cantidad = Math.max(1, Number(nuevaCantidad));
  guardarCarrito(carrito);
  renderizarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem(CLAVE_CARRITO);
  actualizarContadorCarrito();
  renderizarCarrito();
}

function calcularTotal() {
  return obtenerCarrito().reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function actualizarContadorCarrito() {
  const cantidadTotal = obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
  document.querySelectorAll("[data-cart-count]").forEach(elemento => {
    elemento.textContent = cantidadTotal;
  });
}

function renderizarCarrito() {
  const contenedor = document.getElementById("carritoContenido");
  const subtotal = document.getElementById("subtotalCarrito");
  const total = document.getElementById("totalCarrito");

  if (!contenedor) return;

  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="empty-message">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos desde el catálogo para continuar.</p>
        <a href="productos.html" class="btn btn-brand">Ver productos</a>
      </div>
    `;
  } else {
    contenedor.innerHTML = carrito.map(item => `
      <article class="cart-item">
        <img src="${item.imagen}" alt="${item.nombre}">
        <div>
          <h3>${item.nombre}</h3>
          <p>${formatoPrecio(item.precio)} c/u</p>
          <strong>Subtotal: ${formatoPrecio(item.precio * item.cantidad)}</strong>
        </div>
        <div class="cart-actions">
          <input class="form-control" type="number" min="1" value="${item.cantidad}" onchange="cambiarCantidad('${item.id}', this.value)">
          <button class="btn btn-outline-danger btn-sm" onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
        </div>
      </article>
    `).join("");
  }

  const totalCarrito = calcularTotal();
  if (subtotal) subtotal.textContent = formatoPrecio(totalCarrito);
  if (total) total.textContent = formatoPrecio(totalCarrito);
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  renderizarCarrito();

  const btnVaciar = document.getElementById("btnVaciarCarrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      if (obtenerCarrito().length === 0) return;
      const confirmar = confirm("¿Deseas vaciar el carrito?");
      if (confirmar) vaciarCarrito();
    });
  }

  const btnFinalizar = document.getElementById("btnFinalizarCompra");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      if (obtenerCarrito().length === 0) {
        alert("Debes agregar productos antes de finalizar la compra.");
        return;
      }
      alert("Pedido registrado correctamente. Nos contactaremos contigo para coordinar el pago y la entrega.");
      vaciarCarrito();
    });
  }
});
