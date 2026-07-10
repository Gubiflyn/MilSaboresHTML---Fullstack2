document.addEventListener("DOMContentLoaded", () => {
  const contactoForm = document.getElementById("contactoForm");

  if (contactoForm) {
    contactoForm.addEventListener("submit", event => {
      event.preventDefault();

      const mensaje = document.getElementById("mensajeContacto");
      mensaje.textContent = "Mensaje enviado correctamente. Te contactaremos a la brevedad.";
      mensaje.className = "form-message success";
      contactoForm.reset();
    });
  }

  actualizarContadorCarrito();
});
