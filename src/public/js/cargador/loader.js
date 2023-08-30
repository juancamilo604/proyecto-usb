// conenction
let socket = io();
var titulo = document.querySelector('.titleR');
titulo.style.display = "none";

socket.on('cargueMasivo', function (data) {
    console.log("esta en el sockett");
    if (data["estado"] == "finalizado"){
      titulo.style.display = "flex";
      alert("registros insertados con exito")
      ocultarLoader();
    }
  });