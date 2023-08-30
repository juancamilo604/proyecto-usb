// conenction
let socket = io();

var interval = ""
var titulo = document.querySelector('.titiel');

// Este archivo contiene las funciones comunes que utilizan las paginas de los cargadores, para saber si un cargue está en progreso o no
function recuGetDataCargue(JSONTransaccion, tipoCargue) {
  interval = setInterval(() => {
    socket.emit('status', "person.nombre");
  }, 10000);
}

socket.on('estadoPython', function (data) {
  console.log("rAAAATA");
  const
    progresoLoader = document.querySelector('#progresoLoader'),
    linkNavegaOtras = document.querySelector('#navegarOtras');
  progresoLoader.classList.remove('displayNone'); // muestra
  linkNavegaOtras.classList.remove('displayNone'); // muestra
  console.log("El estadoooo de python");
  console.log(data);
  progresoLoader.innerHTML = `${data["porcentaje"]}%`;
  if (data["estado"] == "finalizado"){
    console.log("llega");
    titulo.style.display = "flex";
    clearInterval(interval);
    ocultarLoader();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // se encuentra en main.hbs
  recuGetDataCargue("s","s")
});
