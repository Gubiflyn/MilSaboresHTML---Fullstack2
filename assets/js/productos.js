document.addEventListener("DOMContentLoaded", () => {
  const productosGrid = document.getElementById("productosGrid");
  const buscador = document.getElementById("buscador");
  const filtroCategoria = document.getElementById("filtroCategoria");
  const btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
  const sinResultados = document.getElementById("sinResultados");

  if (!productosGrid) return;

  function crearTarjetaProducto(producto) {
    return `
      <div class="col-sm-6 col-lg-4">
        <article class="product-card h-100">
          <a href="detalle.html?id=${producto.id}" class="product-image-link" aria-label="Ver detalle de ${producto.nombre}">
            <img
              src="${producto.imagen}"
              alt="${producto.nombre}"
              onerror="this.src='assets/img/icono.png'">
          </a>

          <div class="product-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
              <span class="product-category">${producto.categoria}</span>
              <span class="product-rating">★ 4.8</span>
            </div>

            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="product-price">${formatoPrecio(producto.precio)}</p>

            <div class="product-actions mt-auto">
              <a href="detalle.html?id=${producto.id}" class="btn btn-outline-brand w-100">
                Ver detalle
              </a>
              <button type="button" class="btn btn-brand w-100" data-add-cart="${producto.id}">
                Agregar
              </button>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  function filtrarProductos() {
    const texto = buscador.value.trim().toLowerCase();
    const categoria = filtroCategoria.value;

    return productosMilSabores.filter(producto => {
      const coincideTexto =
        producto.nombre.toLowerCase().includes(texto) ||
        producto.descripcion.toLowerCase().includes(texto) ||
        producto.detalle.toLowerCase().includes(texto) ||
        producto.categoria.toLowerCase().includes(texto);

      const coincideCategoria = categoria === "todos" || producto.categoria === categoria;

      return coincideTexto && coincideCategoria;
    });
  }

  function renderizarProductos() {
    const productosFiltrados = filtrarProductos();

    productosGrid.innerHTML = productosFiltrados.map(crearTarjetaProducto).join("");

    if (productosFiltrados.length === 0) {
      sinResultados.classList.remove("d-none");
    } else {
      sinResultados.classList.add("d-none");
    }
  }

  productosGrid.addEventListener("click", event => {
    const botonAgregar = event.target.closest("[data-add-cart]");

    if (!botonAgregar) return;

    const idProducto = botonAgregar.dataset.addCart;
    const producto = productosMilSabores.find(item => item.id === idProducto);

    if (!producto) return;

    agregarAlCarrito(producto, 1);
    botonAgregar.textContent = "Agregado";
    botonAgregar.classList.add("btn-added");

    setTimeout(() => {
      botonAgregar.textContent = "Agregar";
      botonAgregar.classList.remove("btn-added");
    }, 1200);
  });

  buscador.addEventListener("input", renderizarProductos);
  filtroCategoria.addEventListener("change", renderizarProductos);

  btnLimpiarFiltros.addEventListener("click", () => {
    buscador.value = "";
    filtroCategoria.value = "todos";
    renderizarProductos();
  });

  renderizarProductos();
});
