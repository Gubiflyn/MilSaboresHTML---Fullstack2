document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get("id");
  const producto = productosMilSabores.find(item => item.id === idProducto);

  const detalleProducto = document.getElementById("detalleProducto");
  const detalleExtra = document.getElementById("detalleExtra");
  const productoNoEncontrado = document.getElementById("productoNoEncontrado");

  if (!producto) {
    detalleProducto.classList.add("d-none");
    detalleExtra.classList.add("d-none");
    productoNoEncontrado.classList.remove("d-none");
    return;
  }

  const cantidadInput = document.getElementById("cantidadProducto");
  const btnAgregar = document.getElementById("btnAgregarDetalle");
  const btnComprarAhora = document.getElementById("btnComprarAhora");
  const btnRestar = document.getElementById("btnRestarCantidad");
  const btnSumar = document.getElementById("btnSumarCantidad");
  const mensajeDetalle = document.getElementById("mensajeDetalle");
  const imagenPrincipal = document.getElementById("detalleImagen");

  document.title = `${producto.nombre} | Mil Sabores`;
  document.getElementById("breadcrumbProducto").textContent = producto.nombre;
  document.getElementById("detalleCodigo").textContent = crearCodigoProducto(producto.id);
  document.getElementById("detalleEtiqueta").textContent = obtenerEtiquetaCategoria(producto.categoria);
  document.getElementById("detalleCategoria").textContent = producto.categoria;
  document.getElementById("detalleNombre").textContent = producto.nombre;
  document.getElementById("detalleDescripcion").textContent = producto.descripcion;
  document.getElementById("detalleDetalle").textContent = producto.detalle;
  document.getElementById("detallePrecio").textContent = formatoPrecio(producto.precio);

  imagenPrincipal.src = producto.imagen;
  imagenPrincipal.alt = producto.nombre;
  imagenPrincipal.onerror = function () {
    this.src = "assets/img/icono.png";
  };

  renderizarMiniaturas(producto);
  renderizarRelacionados(producto);

  function obtenerCantidad() {
    const cantidad = Number(cantidadInput.value);
    return Number.isNaN(cantidad) || cantidad < 1 ? 1 : cantidad;
  }

  function mostrarMensaje(texto) {
    mensajeDetalle.textContent = texto;
    mensajeDetalle.classList.remove("d-none");

    setTimeout(() => {
      mensajeDetalle.classList.add("d-none");
    }, 1800);
  }

  function agregarProductoAlCarrito() {
    const cantidad = obtenerCantidad();
    agregarAlCarrito(producto, cantidad);
    mostrarMensaje(`${producto.nombre} fue agregado al carrito.`);
  }

  btnRestar.addEventListener("click", () => {
    cantidadInput.value = Math.max(1, obtenerCantidad() - 1);
  });

  btnSumar.addEventListener("click", () => {
    cantidadInput.value = obtenerCantidad() + 1;
  });

  cantidadInput.addEventListener("change", () => {
    cantidadInput.value = obtenerCantidad();
  });

  btnAgregar.addEventListener("click", agregarProductoAlCarrito);

  btnComprarAhora.addEventListener("click", () => {
    agregarProductoAlCarrito();
    setTimeout(() => {
      window.location.href = "carrito.html";
    }, 700);
  });
});

function crearCodigoProducto(id) {
  return `MS-${id.replaceAll("-", "").slice(0, 6).toUpperCase()}`;
}

function obtenerEtiquetaCategoria(categoria) {
  const etiquetas = {
    Tortas: "Producto para celebraciones",
    Postres: "Postre artesanal",
    Especiales: "Alternativa especial",
    Panadería: "Producto horneado"
  };

  return etiquetas[categoria] || "Preparación artesanal";
}

function renderizarMiniaturas(productoActual) {
  const contenedor = document.getElementById("detalleMiniaturas");
  const imagenPrincipal = document.getElementById("detalleImagen");

  if (!contenedor || !imagenPrincipal) return;

  const imagenes = [
    productoActual,
    ...productosMilSabores
      .filter(producto => producto.id !== productoActual.id && producto.categoria === productoActual.categoria)
      .slice(0, 2)
  ];

  contenedor.innerHTML = imagenes.map((producto, index) => `
    <button type="button" class="thumb-button ${index === 0 ? "active" : ""}" data-img="${producto.imagen}" data-alt="${producto.nombre}">
      <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='assets/img/icono.png'">
    </button>
  `).join("");

  contenedor.addEventListener("click", event => {
    const boton = event.target.closest(".thumb-button");
    if (!boton) return;

    document.querySelectorAll(".thumb-button").forEach(item => item.classList.remove("active"));
    boton.classList.add("active");

    imagenPrincipal.src = boton.dataset.img;
    imagenPrincipal.alt = boton.dataset.alt;
  });
}

function renderizarRelacionados(productoActual) {
  const seccionRelacionados = document.getElementById("seccionRelacionados");
  const contenedor = document.getElementById("productosRelacionados");

  if (!seccionRelacionados || !contenedor) return;

  const relacionados = productosMilSabores
    .filter(producto => producto.id !== productoActual.id && producto.categoria === productoActual.categoria)
    .slice(0, 3);

  if (relacionados.length === 0) return;

  contenedor.innerHTML = relacionados.map(producto => `
    <div class="col-md-4">
      <article class="product-card related-card h-100">
        <a href="detalle.html?id=${producto.id}" class="product-image-link" aria-label="Ver detalle de ${producto.nombre}">
          <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='assets/img/icono.png'">
        </a>
        <div class="product-body">
          <span class="product-category">${producto.categoria}</span>
          <h3>${producto.nombre}</h3>
          <p class="product-price">${formatoPrecio(producto.precio)}</p>
          <a href="detalle.html?id=${producto.id}" class="btn btn-outline-brand w-100">Ver producto</a>
        </div>
      </article>
    </div>
  `).join("");

  seccionRelacionados.classList.remove("d-none");
}
