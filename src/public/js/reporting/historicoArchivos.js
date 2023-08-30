document.addEventListener("DOMContentLoaded", () => {
    const
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
          {
            extend: 'excelHtml5',
            text: 'EXCEL',
            titleAttr: 'Exportar a Excel',
            className: 'green darken-4',
          },
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
      }
    new DataTable('#tableDashboard', configDatatable);
    })