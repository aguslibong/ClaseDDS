// script.js
const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function () {
  mensaje.textContent = "¡Hiciste clic en el botón!";
  document.body.style.backgroundColor = "lightgreen";
});