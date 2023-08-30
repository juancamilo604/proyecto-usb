document.addEventListener('DOMContentLoaded', () => {
  const
    btnCargue = document.querySelector('#btnCargue'),
    nombreExcel = document.querySelector('#nombreExcel').innerHTML,
    nameFile = document.getElementById("nameFile").value
    tipoCargue = 'cargueMasivoInfobip';



  btnCargue.addEventListener('click', async () => {
    cargarLoader("Procesando... Espere por favor");
    await postData('/cargue/cargueMasivoRegistros', { nameFile })
      .then((res) => {
        console.log(res);
        console.log("Esperaaa");
        ocultarLoader();
        window.location.href = '/cargue/loader';
       
      });
  });

});
