const { raw } = require('express');

const
  db = require('../../database'),
  database = require('../../keys').database.database,
  fs = require('fs');

let comunes = {};

comunes.getHoraActual = () => {
  const HOY = new Date();
  const HORA = HOY.getHours();
  let MIN = HOY.getMinutes();
  MIN = MIN.toString().length === 1 ? `0${MIN}` : MIN;

  return `${HORA}:${MIN}`;
}

comunes.getFechaActual = () => {
  const HOY = new Date();
  const ARR_MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const MES = ARR_MESES[HOY.getMonth()];
  const DIA_MES = HOY.getDate();

  return `${DIA_MES}/${MES}`;
}

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

comunes.getDataJSON = (data) => {
  try {
    const
      { formato, rutaJSON } = data,
      rawdata = fs.readFileSync(rutaJSON),
      objJson = JSON.parse(rawdata);

    if (formato === 'json') return objJson;
    if (formato === 'objeto') return rawdata;
  } catch (error) {
    console.log('Error:', error);
  }
}

module.exports = comunes;