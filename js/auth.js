document.addEventListener("DOMContentLoaded", () => {
  // ----- Registro -----
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const correo = document.getElementById("correo").value;
      const contrasena = document.getElementById("contrasena").value;

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const existe = usuarios.some(u => u.correo === correo);
      if (existe) {
        alert("El correo ya está registrado.");
        return;
      }

      usuarios.push({ nombre, correo, contrasena });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("¡Registro exitoso!");
      window.location.href = "login.html";
    });
  }

  // ----- Login -----
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const correo = document.getElementById("correoLogin").value;
      const contrasena = document.getElementById("contrasenaLogin").value;

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
      if (usuario) {
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        alert("Bienvenido " + usuario.nombre);

        if (usuario.correo === "admin@gmail.com") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "citas.html";
        }
      } else {
        alert("Credenciales incorrectas.");
      }
    });
  }
});



