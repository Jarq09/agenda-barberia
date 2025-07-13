document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
  if (!usuario || usuario.correo !== "admin@gmail.com") {
    alert("Acceso denegado.");
    window.location.href = "login.html";
    return;
  }

  const lista = document.getElementById("listaCitas");
  const citas = JSON.parse(localStorage.getItem("citas")) || [];

  function mostrarCitas() {
    lista.innerHTML = "";
    if (citas.length === 0) {
      lista.innerHTML = "<li>No hay citas agendadas.</li>";
      return;
    }

    citas.forEach((cita, index) => {
      const li = document.createElement("li");
      li.textContent = `${cita.fecha} ${cita.hora} - ${cita.servicio} (Cliente: ${cita.correo})`;
      const btn = document.createElement("button");
      btn.textContent = "Cancelar";
      btn.onclick = () => eliminarCita(index);
      li.appendChild(btn);
      lista.appendChild(li);
    });
  }

  function eliminarCita(index) {
    citas.splice(index, 1);
    localStorage.setItem("citas", JSON.stringify(citas));
    mostrarCitas();
  }

  mostrarCitas();
});

function cerrarSesion() {
  localStorage.removeItem("usuarioActual");
  window.location.href = "login.html";
}
