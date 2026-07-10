document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get("id");
  const producto = productosMilSabores.find(item => item.id === idProducto);

  const detalleProducto = document.getElementById("detalleProducto");
  const productoNoEncontrado = document.getElementById("productoNoEncontrado");

  if (!producto) {
    detalleProducto.classList.add("d-none");
    productoNoEncontrado.classList.remove("d-none");
    return;
  }

  document.title = `${producto.nombre} | Mil Sabores`;
  document.getElementById("detalleImagen").src = producto.imagen;
  document.getElementById("detalleImagen").alt = producto.nombre;
  document.getElementById("detalleCategoria").textContent = producto.categoria;
  document.getElementById("detalleNombre").textContent = producto.nombre;
  document.getElementById("detalleDescripcion").textContent = producto.descripcion;
  document.getElementById("detalleDetalle").textContent = producto.detalle;
  document.getElementById("detallePrecio").textContent = formatoPrecio(producto.precio);

  const btnAgregar = document.getElementById("btnAgregarDetalle");
  const cantidadInput = document.getElementById("cantidadProducto");

  btnAgregar.addEventListener("click", () => {
    const cantidad = Math.max(1, Number(cantidadInput.value));
    agregarAlCarrito(producto, cantidad);
    btnAgregar.textContent = "Producto agregado";
    setTimeout(() => btnAgregar.textContent = "Agregar al carrito", 1200);
  });
});
