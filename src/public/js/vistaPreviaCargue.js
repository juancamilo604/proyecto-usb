document.addEventListener('DOMContentLoaded', () => {
  const 
    titulo = document.querySelector('.titiel'),
    tipoCargue = 'cargadorRegistros';

  console.log(titulo);
  cargarLoader("Procesando... Espere Por Favor");

  postData('/cargue/selectEstadoCargueMasivo', { tipoCargue })
  .then(res => {
    const
      dataCargue = res[0],
      estado = dataCargue.EST_CDETALLE,
      estadoInsert = dataCargue.EST_CDETALLE2;
      console.log(dataCargue);


    if (estado === 'subiendo') {
      titulo.style.display = "none";
      cargarLoader('Cargue en progreso...');
      recuGetDataCargue(estadoInsert, tipoCargue);
    } else {
      console.log("Seeeeee");
      ocultarLoader();
    }
  });



});
