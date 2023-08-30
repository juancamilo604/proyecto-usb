document.addEventListener('DOMContentLoaded', () => {
  const
    btnCargarExcel = document.getElementById('btnCargarExcel'),
    fileExcel = document.getElementById('fileExcel'),
    tipoCargue = 'cargueMasivoInfobip';
    fileExcel.value = null;
  // cargarLoader("Cargando... Espere Por Favor");

  postData('/sufi/selectEstadoCargueMasivo', { tipoCargue })
    .then(res => {
      const
        dataCargue = res[0],
        estado = dataCargue.EST_CDETALLE,
        archivoTransaccion = dataCargue.EST_CDETALLE1;

      if (estado === 'subiendo') {
        cargarLoader('Cargue en progreso...');
        recuGetDataCargue(archivoTransaccion, tipoCargue);
      } else {
        ocultarLoader();
      }
    });

  btnCargarExcel.addEventListener('click', (e) => {
    let msgToast = null;

    const mimeExcel = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    if (!fileExcel.value) {
      msgToast = 'Seleccione un Excel'
    } else if (fileExcel.files[0].type !== mimeExcel) {
      msgToast = 'El archivo debe ser un Excel'
    }

    if (msgToast) {
      Toast.fire({
        icon: 'error',
        title: msgToast,
      });
      msgToast = null;
      e.preventDefault()
    } else {
      cargarLoader("Procesando... Espere Por Favor")
    }
  }, false)

});