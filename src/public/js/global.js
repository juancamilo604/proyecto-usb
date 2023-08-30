function downloadFile(blob, name = "result.xlsx") {
  const href = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href,
    style: "display:none",
    download: name,
  });
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(href);
  a.remove();
}

const download = async (route,  data = {}) => {
  let res = await fetch(route, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      downloadFile(blob);
      return true
    });
    return res
}


// * getData -> Peticiones Fetch GET - Recibe como parametro una ruta Ej: "/prueba"
// * --- Ejemplo - Misma idea con el resto de funciones Fetch
// *  getData("/rutaNode")
// *    then((res) => console.log(res))
const getData = async (route) => {
  try {
    let res = await fetch(route);
    let json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    return json;
  } catch (err) {
    console.error('Error en fn getData()', err);
  }
};

// * postData -> Peticiones Fetch POST - Recibe como parametro una ruta y un JSON Ej: "/prueba", {x:1,y:2}
const postData = async (route, data = {}) => {
  try {
    let res = await fetch(route, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    return json;
  } catch (err) {
    console.log(err);
  }
};

// * deleteData -> Peticiones Fetch DELETE - Recibe como parametro una ruta Ej: "/delete/:id"
const deleteData = async (route) => {
  try {
    let res = await fetch(route, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    return json;
  } catch (err) {
    console.log(err);
  }
};

// * Toast -> Pequeñas alertas, si modificas esto se modifican TODAS
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end', // * Posicion
  showConfirmButton: false,
  timer: 4000, // * Time
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

// * inputMayus -> Pasar a MAYUSCULAS el texto de los inputs
// * --- los cuales son seleccionados antes con 'let inputTal = document.getElementById("inputTal")'
// * --- se pasan los campos por Array de forma dinamica Ej: inputsMayus([inputTal, etc...])
// TODO --- Para un ejemplo ver input en el Login
const inputsMayus = (arrInputs = []) => {
  arrInputs.forEach((element) => {
    element.addEventListener('keyup', (e) => {
      element.value = element.value.toUpperCase();
    });
  });
};

const inputSoloNum = (arrInputs = []) => {
  arrInputs.forEach((element) => {
    element.addEventListener('keypress', (e) => {
      if (e.charCode >= 48 && e.charCode <= 57) {
        return true;
      }
      e.preventDefault();
      return false;
    });
  });
};

// * limpiarCampos -> Limpia inputs Materialize - Misma idea de la function inputsMayus()
const limpiarCampos = (arrInputs = []) => {
  arrInputs.forEach((element) => {
    element.value = '';
    element.nextElementSibling.classList.remove('active');
  });
};

// * mensajeSuccess -> Muestra una alerta tomando el nombre de '<div id="messageSuccess" data-message="{{success}}"></div>'
// * --- ver en views/partials/messages.hbs
const mensajeSweetalert2 = () => {
  let message = '';
  const messageSuccess = document.getElementById('messageSuccess'),
    messageInfo = document.getElementById('messageInfo'),
    messageWarning = document.getElementById('messageWarning'),
    messageError = document.getElementById('messageError');
  if (messageSuccess) {
    message = messageSuccess.dataset.message;
    Toast.fire({ icon: 'success', title: message });
  } else if (messageInfo) {
    message = messageInfo.dataset.message;
    Toast.fire({ icon: 'info', title: message });
  } else if (messageWarning) {
    message = messageWarning.dataset.message;
    Toast.fire({ icon: 'warning', title: message });
  } else if (messageError) {
    message = messageError.dataset.message;
    Toast.fire({ icon: 'error', title: message });
  }
};

// * Funciones Cargar y Ocultar loader
const containerLoader = document.getElementById('containerLoader'),
  textLoader = document.getElementById('textLoader'),
  cargarLoader = (message = 'Cargando...') => {
    containerLoader.classList.remove('hidden');
    textLoader.textContent = message;
  },
  ocultarLoader = () => {
    containerLoader.classList.add('hidden');
    textLoader.textContent = '';
  };


// * Fecha
const getFecha = (objData) => { // OJO. Solo sirve si se pasa un new Date() vacio. De lo contrario retorna mal el mes :()

  // @param {
  //  objFecha: obj tipo fecha,
  //  formato: 'yyyyMMdd' (hay mas formatos, mirar en la función)
  //  union: guión, slash, lo que quiera
  //  } objData 
  //
  // @returns { 'fecha formateada en string (ej: 2021-12-24)', dia (num), mes (num), año (num) }

  const
    objFecha = objData.objFecha,
    ano = objFecha.getFullYear();

  let
    mes = objFecha.getMonth() + 1,
    dia = objFecha.getDate();

  mes = mes.toString().length === 1 ? `0${mes}` : mes;
  dia = dia.toString().length === 1 ? `0${dia}` : dia;

  let fechaFormateada = null;
  switch (objData.formato) {
    case 'yyyyMMdd':
      fechaFormateada = [ano, mes, dia].join(objData.union);
      break;

    case 'ddMMyyyy':
      fechaFormateada = [dia, mes, ano].join(objData.union);
      break;

    case 'MMddyyyy':
      fechaFormateada = [mes, dia, ano].join(objData.union);
      break;

    default:
      break;
  }

  return { fechaFormateada, ano, mes, dia }
}

function sumarDias(fecha, dias) {
  fecha.setDate(fecha.getDate() + dias);

  return getFecha({ objFecha: fecha, formato: 'yyyyMMdd', union: '-' });
}

const getFechaEstetica = (fecha) => { // La fecha llega así -> 2022-01-19 19:30:46 practicamente la de mysql
  const arrFechaHora = fecha.split(' ');
  const arrFecha = arrFechaHora[0].split('-');
  const hora = arrFechaHora[1];

  console.log('ECHA', arrFecha);
  // fecha estetica
  const objFecha = new Date(arrFecha[0], arrFecha[1], arrFecha[2]),
    ano = objFecha.getFullYear(),
    mes = objFecha.getMonth(),
    dia = objFecha.getDate(),
    objMeses = {
      1: 'Ene',
      2: 'Feb',
      3: 'Mar',
      4: 'Abr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Ago',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dic',
    };

  console.log('FECHA DATE', objFecha);
  return { fecha: `${objMeses[mes]} ${dia} de ${ano}`, hora };
}

function beautyFechaSQL(fecha) { // La fecha llega así -> 2022-01-19 19:30:46 (AAAA-MM-DD) practicamente la de mysql
  const
    arrFH = fecha.split(' '),
    arrFecha = arrFH[0].split('-'),
    hora = arrFH[1],
    ano = arrFecha[0],
    mes = arrFecha[1],
    dia = arrFecha[2],
    objMeses = {
      '01': 'Ene',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Abr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Ago',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dic',
    };

  return {
    fecha: `${objMeses[mes]} ${dia} de ${ano}`,
    ano,
    hora
  }
}

// función para quitar o poner clases a un listado de objetos del DOM
// ej: toggleClass({ accion: 'add', clase: 'displayNone', arrElementos: [contPalabraClave, contSelPalabraClave] });
// ej: toggleClass({ accion: 'add', clase: 'obli', arrElementos: [inpFechaIni, inpFechaFin] });
function toggleClass(data) {
  const { accion, clase, arrElementos } = data;

  arrElementos.forEach(obj => {
    if (accion === 'add') {
      obj.classList.add(clase);
    }

    if (accion === 'remove') {
      obj.classList.remove(clase);
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {

  mensajeSweetalert2();


}); // fin DOMContentLoaded



