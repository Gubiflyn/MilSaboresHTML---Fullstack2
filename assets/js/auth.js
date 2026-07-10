const CLAVE_USUARIOS = "milSaboresUsuarios";
const CLAVE_SESION = "milSaboresSesion";

function obtenerUsuarios() {
  const usuariosGuardados = JSON.parse(localStorage.getItem(CLAVE_USUARIOS));

  if (usuariosGuardados && usuariosGuardados.length > 0) {
    return usuariosGuardados;
  }

  const usuariosIniciales = [
    {
      nombre: "Cliente",
      apellido: "Demo",
      email: "cliente@milsabores.cl",
      password: "123456"
    }
  ];

  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosIniciales));
  return usuariosIniciales;
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

function mostrarMensaje(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = `form-message ${tipo}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", event => {
      event.preventDefault();

      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;
      const mensaje = document.getElementById("loginMensaje");
      const usuarios = obtenerUsuarios();

      const usuario = usuarios.find(item => item.email.toLowerCase() === email && item.password === password);

      if (!usuario) {
        mostrarMensaje(mensaje, "Correo o contraseña incorrectos.", "error");
        return;
      }

      localStorage.setItem(CLAVE_SESION, JSON.stringify({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      }));

      mostrarMensaje(mensaje, "Inicio de sesión correcto. Redirigiendo...", "success");
      setTimeout(() => window.location.href = "index.html", 1000);
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", event => {
      event.preventDefault();

      const nombre = document.getElementById("registerNombre").value.trim();
      const apellido = document.getElementById("registerApellido").value.trim();
      const email = document.getElementById("registerEmail").value.trim().toLowerCase();
      const password = document.getElementById("registerPassword").value;
      const password2 = document.getElementById("registerPassword2").value;
      const mensaje = document.getElementById("registerMensaje");
      const usuarios = obtenerUsuarios();

      if (password.length < 6) {
        mostrarMensaje(mensaje, "La contraseña debe tener al menos 6 caracteres.", "error");
        return;
      }

      if (password !== password2) {
        mostrarMensaje(mensaje, "Las contraseñas no coinciden.", "error");
        return;
      }

      const existeUsuario = usuarios.some(item => item.email.toLowerCase() === email);
      if (existeUsuario) {
        mostrarMensaje(mensaje, "Ya existe una cuenta con ese correo.", "error");
        return;
      }

      usuarios.push({ nombre, apellido, email, password });
      guardarUsuarios(usuarios);
      mostrarMensaje(mensaje, "Cuenta creada correctamente. Ahora puedes iniciar sesión.", "success");
      registerForm.reset();
    });
  }
});
