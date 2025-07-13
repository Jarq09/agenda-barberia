// Lógica de gestión de citas

document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
  if (!usuario) {
    alert("Debes iniciar sesión.");
    window.location.href = "login.html";
    return;
  }

  const bienvenida = document.getElementById("bienvenida");
  bienvenida.textContent = "Bienvenido, " + usuario.nombre;

  const form = document.getElementById("formCita");
  const lista = document.getElementById("listaCitas");

  const citas = JSON.parse(localStorage.getItem("citas")) || [];

  function mostrarCitas() {
    lista.innerHTML = "";
    const misCitas = citas.filter(c => c.correo === usuario.correo);
    if (misCitas.length === 0) {
      lista.innerHTML = "<li>No tienes citas agendadas.</li>";
      return;
    }

    misCitas.forEach((cita, index) => {
      const li = document.createElement("li");
      li.textContent = `${cita.fecha} a las ${cita.hora} - ${cita.servicio}`;
      const btn = document.createElement("button");
      btn.textContent = "Eliminar";
      btn.onclick = () => eliminarCita(index);
      btn.classList.add("btn-danger");
      li.appendChild(btn);
      lista.appendChild(li);
    });
  }

  function eliminarCita(index) {
    const indexGlobal = citas.findIndex(
      (c, i) => c.correo === usuario.correo && citas.filter(ci => ci.correo === usuario.correo).indexOf(c) === index
    );
    if (indexGlobal !== -1) {
      citas.splice(indexGlobal, 1);
      localStorage.setItem("citas", JSON.stringify(citas));
      mostrarCitas();
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nuevaCita = {
      correo: usuario.correo,
      fecha: document.getElementById("fecha").value,
      hora: document.getElementById("hora").value,
      servicio: document.getElementById("servicio").value,
    };
    citas.push(nuevaCita);
    localStorage.setItem("citas", JSON.stringify(citas));
    mostrarCitas();
    form.reset();
  });

  mostrarCitas();
});

function cerrarSesion() {
  localStorage.removeItem("usuarioActual");
  window.location.href = "login.html";
}
