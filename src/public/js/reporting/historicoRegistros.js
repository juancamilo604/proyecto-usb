document.addEventListener("DOMContentLoaded", () => {
    const
      inpIdReg = document.querySelector('#inpIdReg'),
      selFiltro = document.querySelector('#selFiltro'),
      contPalabraClave = document.querySelector('#contPalabraClave'),
      inpPalabraClave = document.querySelector('#inpPalabraClave'),
      contFechaFiltro = document.querySelector('#contFechaFiltro'),
      inpFechaFiltro = document.querySelector('#inpFechaFiltro'),
      bodyTabla = document.querySelector('#bodyTabla'),
      configDatatable = {
        // options
        responsive: 'true',
        dom: '<"centerTopDataTable"lf>rt<"centerTopDataTable"ip>B',
        iDisplayLength: 10,
        aLengthMenu: [
          [5, 10, 25, 50, -1],
          [5, 10, 25, 50, 'All'],
        ],
        buttons: [
          // {
          //    extend: 'excelHtml5',
          //    text: 'EXCEL',
          //    titleAttr: 'Exportar a Excel',
          //    className: 'green darken-4',
          // },
        ],
        language: {
          lengthMenu: 'Mostrar _MENU_ registros',
          zeroRecords: 'No se encontraron resultados',
          info: 'Registros en total - _TOTAL_',
          infoEmpty: '0 registros',
          infoFiltered: '(filtrado de un total de MAX registros)',
          sSearch: 'Buqueda rapida:',
          oPaginate: {
            sFirst: 'Primero',
            sLast: 'Último',
            sNext: 'Siguiente',
            sPrevious: 'Anterior',
          },
          sProcessing: 'Procesando...',
        },
        "drawCallback": function (settings) {
          // Sucede que cuando hay páginación en una tabla si le ponemos funciones a los elementos dentro de las filas de la tabla
          // esas funciones que le pongamos a un elemento solo quedarán para los elementos visibles.
          // esta función drawCallback, se ejecuta cada que se mueva algún botón propio del datatable
  
        }
      },
      contBtnQuitarFiltro = document.querySelector('#contBtnQuitarFiltro'),
      btnQuitarFiltro = document.querySelector('#btnQuitarFiltro'),
      btnDescargar = document.querySelector('#descargarExcel'),
      btnFiltrar = document.querySelector('#btnFiltrar');
  
    let tableDashboard = new DataTable('#tableDashboard', configDatatable);
  
    inputsMayus(document.querySelectorAll('.input_mayus'));
  
    getData('/dashboard/selectFiltroDashArchivos')
      .then(res => {
        // console.log(res);
        let listadoFiltro = null;
  
        res.forEach((elem) => {
          if (elem.EST_CDETALLE)
            listadoFiltro += `<option value='${elem.EST_CDETALLE}'>${elem.EST_CDETALLE}</option>`;
        });
  
        selFiltro.innerHTML += listadoFiltro;
        M.FormSelect.init(document.querySelectorAll('.select'));
      });
  
    getAllDatosTabla();
  
    selFiltro.addEventListener('change', () => {
  
      arrMuestraFecha = ['FECHA DE REGISTRO', 'ULTIMA ACTUALIZACION'];
      if (arrMuestraFecha.includes(selFiltro.value)) { // Se muestra el input de fecha
        contPalabraClave.classList.add('displayNone'); // oculta
        inpPalabraClave.classList.remove('obli'); // ya no es obligatorio
        contFechaFiltro.classList.remove('displayNone'); // muestra
        inpFechaFiltro.classList.add('obli'); // ya es obligatorio
      } else {
        contFechaFiltro.classList.add('displayNone'); // oculta
        inpFechaFiltro.classList.remove('obli'); // ya no es obligatorio
        contPalabraClave.classList.remove('displayNone'); // muestra
        inpPalabraClave.classList.add('obli'); // ya es obligatorio
      }
    });
  
    btnFiltrar.addEventListener('click', () => {
      let enviar = true;
  
      const arrElementosForm = [...document.querySelectorAll('.obli')].reverse();
      arrElementosForm.forEach((elem) => {
        console.log(elem.value);
        if (!elem.value.trim()) {
          Toast.fire({
            icon: 'error',
            title: `Falta: ${elem.getAttribute('data-campo')}`,
          });
  
          ocultarLoader();
          enviar = false;
          return;
        }
      });
  
      if (enviar) {
        const
          campo = selFiltro.value,
          clave = inpPalabraClave.value || null,
          fecha = inpFechaFiltro.value || null;
  
        postData('/dashboard/getDatosDashArchivos', { campo, clave, fecha })
          .then(res => {
            // console.log(res);
            updateTabla(res);
            contBtnQuitarFiltro.classList.remove('displayNone'); // mostrar
          });
      }
    });
  
    btnQuitarFiltro.addEventListener('click', () => {
      contBtnQuitarFiltro.classList.add('displayNone'); // hide
      selFiltro.value = '';
      inpPalabraClave.value = '';
      inpFechaFiltro.value = '';
      contFechaFiltro.classList.add('displayNone'); // oculta
      contPalabraClave.classList.remove('displayNone'); // muestra
      M.FormSelect.init(document.querySelectorAll('.select'));
      getAllDatosTabla();
  
    });
  
    function getAllDatosTabla() {
      postData('/dashboard/getDatosDashArchivos')
        .then(res => {
          // console.log(res);
          updateTabla(res);
        });
    }
  
    function updateTabla(res) {
      let contenidoTabla = '<tr>';
      if (res.length) { // si trajo datos
        res.forEach((obj) => {
          contenidoTabla += `
            <td>${obj.REG_NNUM}</td>
            <td>${obj.REG_CCOMPANY}</td>
            <td>${obj.REG_CSTATUS}</td>
            <td>${obj.REG_CBOT}</td>
            <td>${obj.REG_CFECHA_REGISTRO}</td>
            </tr>`;
        });
  
        // reset data table
        tableDashboard.destroy(); // quitar Datatable
        bodyTabla.innerHTML = contenidoTabla;
        tableDashboard = new DataTable('#tableDashboard', configDatatable); // volver a colocar Datatable
  
      } else {
        tableDashboard.destroy(); // quitar Datatable
        bodyTabla.innerHTML = '';
        tableDashboard = new DataTable('#tableDashboard', configDatatable); // volver a colocar Datatable
      }
    }
    
    btnDescargar.addEventListener("click", async () => {
      btnDescargar.disabled = true;
      campo = selFiltro.value || null,
      clave = inpPalabraClave.value || null,
      fecha = inpFechaFiltro.value || null;
      await download('/dashboard/download',{ campo, clave, fecha })
      btnDescargar.disabled = false;    
    })
;
  
  });