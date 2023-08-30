const ExcelJS = require('exceljs');

async function getDataExcel(objData) {
    const { rutaArchivo, req } = objData;
    return new Promise((resolve, reject) => {
      let arrDatos = [];
      const workbook = new ExcelJS.Workbook();
  
      workbook.xlsx
        .readFile(rutaArchivo)
        .then(() => {
  
          try {
            let
              hojas = workbook.worksheets.map((sheet) => sheet.name),
              selectedHoja1 = workbook.getWorksheet(hojas[0]),
              cantFilas = selectedHoja1.actualRowCount, // para que la diga bien, borrar por debajo de la tabla del excel bien
              cantColumnas = selectedHoja1.actualColumnCount; // para que la diga bien, borrar por lado derecho de la tabla del excel bien
  
            arrDatos.push({
              hojasExcel: hojas,
              cantRegistros: cantFilas
            });
            if (arrDatos.length) {
              resolve({ arrDatos });
            } else {
              reject('No se pudo extraer los datos del Excel');
            }
  
          } catch (err) {
            reject(`Error en el archivo Excel ${err} `);
          }
        });
  
    });
}
  
module.exports = {
    getDataExcel,
};