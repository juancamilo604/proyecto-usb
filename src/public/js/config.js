document.addEventListener("DOMContentLoaded", function () {
  // * Materialize
  // window.elemsModal = document.querySelectorAll(".modal");
  // M.Modal.init(elemsModal);
  var elemsSelect = document.querySelectorAll('.select');
  M.FormSelect.init(elemsSelect);
  // * Maximo Caracteres Inputs Materialize
  $('[data-length]').characterCounter();
  // * Tabs Cards Materialize
  // $(document).ready(function () {
  //   $("ul.tabs").tabs();
  // });
  // * Collapsible //
  let elemsCollapsible = document.querySelectorAll('.collapsible');
  M.Collapsible.init(elemsCollapsible);
  // * MaterialBox //
  let elemsMaterialBox = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(elemsMaterialBox);
  // * Picker //
  let elemsPicker = document.querySelectorAll('.datepicker');
  M.Datepicker.init(elemsPicker);
  let currentYear = new Date(Date.now()).getFullYear()
  $('.datepickerPreparacion').datepicker({
    autoClose: true,
    format: 'dd/mm/yyyy',
    container: 'body',
    i18n: {
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    },
    yearRange: [currentYear - 120, currentYear]
  });
  $('.datepicker').datepicker({
    autoClose: true,
    format: 'yyyy-mm-dd',
    container: 'body',
    i18n: {
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    },
    yearRange: [currentYear - 120, currentYear + 20]
  });

  // * Datatables //
  let configDatatable = {
    // options
    scrollX: true,
    responsive: 'true',
    dom: '<"centerTopDataTable"lf>rt<"centerTopDataTable"ip>B',
    iDisplayLength: 5,
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
      sSearch: 'Busqueda rapida:',
      oPaginate: {
        sFirst: 'Primero',
        sLast: 'Último',
        sNext: 'Siguiente',
        sPrevious: 'Anterior',
      },
      sProcessing: 'Procesando...',
    },
  };
  let tableDatatable = new DataTable('#tablaDT', configDatatable);

});
