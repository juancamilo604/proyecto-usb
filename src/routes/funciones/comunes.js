const
  path = require('path'),
  fs = require('fs'),
  pathBase = '';

let comunes = {};

comunes.getRutaArchivo = (obj) => {
  const { ruta, nombreArchivo } = obj;
  let
    relativa = null,
    absolutaServidorProduccion = null,
    absolutaServidorPruebas = null;

  if (ruta === 'excel') {
    relativa = path.resolve(`./src/public/doc/excel`);
    absolutaServidorProduccion = `${pathBase}/src/public/doc/excel`;
    absolutaServidorPruebas = `${pathBase}/src/public/doc/excel`;
    console.log(relativa);
    console.log(absolutaServidorProduccion);
    console.log(absolutaServidorPruebas);
  }

  if (ruta === 'transacciones') {
    relativa = path.resolve(`./src/public/transacciones`);
    absolutaServidorProduccion = `${pathBase}/src/public/transacciones`;
    absolutaServidorPruebas = `${pathBase}/src/public/transacciones`;
    console.log(relativa);
    console.log(absolutaServidorProduccion);
    console.log(absolutaServidorPruebas);
  }

  if (ruta === 'python') {
    relativa = path.resolve(`./src/python`);
    absolutaServidorProduccion = `${pathBase}/src/python`;
    absolutaServidorPruebas = `${pathBase}/src/python`;
    console.log(relativa);
    console.log(absolutaServidorProduccion);
    console.log(absolutaServidorPruebas);
  }
  if (ruta === 'result') {
    console.log("entra a la rutaaka")
    relativa = path.resolve(`./src/python`);
    absolutaServidorProduccion = `${pathBase}/src/python`;
    absolutaServidorPruebas = `${pathBase}/src/python`;
    console.log(relativa);
    console.log(absolutaServidorProduccion);
    console.log(absolutaServidorPruebas);
  }


  if (fs.existsSync(relativa)) return path.join(relativa, nombreArchivo);
  if (fs.existsSync(absolutaServidorProduccion)) return path.join(absolutaServidorProduccion, nombreArchivo);
  if (fs.existsSync(absolutaServidorPruebas)) return path.join(absolutaServidorPruebas, nombreArchivo);
}

/**
 * @param {Obj} param0 
 * @returns {[string]} Array con todas las fechas entre fecha inicio y fecha fin
 */


comunes.updateJSON = (data) => {
  // se le pasa en formato objeto (no json)
  try {
    const
      { rutaJSON, objDataNueva } = data,
      newdata = JSON.stringify(objDataNueva);
    return fs.writeFileSync(rutaJSON, newdata);
  } catch (error) {
    console.log('Error:', error);
  }
}

/**
 * Convierte la fecha actual en formato yyyy-mm-dd
 * @returns fecha en formato yyyy-mm-dd
 */
comunes.getFechaActual = () => {
  let fecha = new Date();
  const offset = fecha.getTimezoneOffset();
  fecha = new Date(fecha.getTime() - (offset * 60 * 1000));
  return fecha.toISOString().split('T')[0];
}

/**
 * Devuelve horas y mintuos de una hora con formato 'HH:mm:ss' por separados
 * @param {String} time Formato 'HH:mm:ss'
 * @returns {Object} 
 */
comunes.getHorasMinutos = (time) => {
  // Nota: Fecha random ya que la fecha no importa solo el tiempo
  const fechaRandom = new Date(`2022-02-02T${time}`);

  return {
    horas: fechaRandom.getHours(),
    minutos: fechaRandom.getMinutes()
  }
}

module.exports = comunes;
