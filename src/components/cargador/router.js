const express = require('express');
const os = require('os');
const { spawn, exec } = require('child_process');
const controller = require('./controller');
const comunes = require('../../routes/funciones/comunes');
const router = express.Router();
const keys = require("../../keys").database;
const con = require("../../database");



router.get("/cargueMasivo", (req, res) => {
  res.render("cargador/vistaCargue", { title: "Cargue" });
});

router.get("/loader", (req, res) => {
  res.render("cargador/loader", { title: "loader" });
});

router.post('/guardeExcel', (req, res) => {
  console.log(req.user);
  console.log(req.user.PER_CUSUARIO)
  try { 
    const
      excel = req.files.fileExcel,
      nombreArchivo = `x${req.user.PER_CUSUARIO}${Math.random()}x${excel.name}`,
      rutaArchivo = comunes.getRutaArchivo({ ruta: 'excel', nombreArchivo });


    console.log(rutaArchivo);
    console.log("Guardeee de el excel");

    if (true) {

      excel.mv(rutaArchivo, (err) => { // guardo el excel en local
        if (err) {
          return res.status(500).send({ message: err });
        } else {
          controller.getDataExcel({ nombreArchivo, rutaArchivo, req }).then(async resolve =>  {
            // console.log(resolve);
            const arrDatos = resolve.arrDatos;
           

            const sqlUpdate = `INSERT INTO ${keys.database}.tbl_rarchivos (FKPER_NUSUARIO, ARC_CORIGEN, ARC_NCARGADOS) VALUES (?, ?, ?);`
            var rutaArchivo2 = rutaArchivo.split("public");
            console.log(rutaArchivo2[1]);
            let [rows] = await con.promise().query(sqlUpdate, [req.user.PER_CUSUARIO,rutaArchivo2[1], arrDatos[0].cantRegistros]);
            return res.status(200).render('cargador/vistaPreviaRegistros', { title: 'Vista previa', nombreExcel: excel.name, nameFile: nombreArchivo, hojasExcel: arrDatos[0].hojasExcel, cantRegistros: arrDatos[0].cantRegistros });
          }).catch(error => {
            console.log(error);
            req.flash("messageError", error);
            return res.redirect('/cargue/cargueMasivo');
          });
        }
      });



    }

  } catch (error) {
    console.log('Error:', error);
  }

});

router.post('/cargueMasivoRegistros', async (req, res) => {

  try {
    // ! IMPORTANTE, para hacer pruebas con el cargador no iniciar con nodemon, ya que en todo momento se está actualizando la carpeta transacciones
    nombreArchivo = `${req.body.nameFile}`,
      rutaArchivo = comunes.getRutaArchivo({ ruta: 'excel', nombreArchivo });
    if (rutaArchivo) {
      let rutaCarpetaPython = comunes.getRutaArchivo({ ruta: 'python', nombreArchivo: 'cargador.py' });
      if (rutaCarpetaPython) {
        const
          PKPER_NCODIGO = req.user.PKPER_NCODIGO,
          runPython = os.platform() === 'linux' ? 'python3' : 'python',
          procesopython = spawn(runPython, ['-u', rutaCarpetaPython, rutaArchivo]);
        // procesopython = spawn('python', ['-u', './src/python/carguePreparacionRegional.py', rutaArchivo, PKPER_NCODIGO, JSONTransaccion]);
        ;

        procesopython.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        procesopython.on('close', (code) => {
          console.log(`Python finalizado con codigo ${code}`);
          req.app.io.emit('cargueMasivo', { estado: 'finalizado' });
        });
        
        // const sqlUpdate = `UPDATE dbp_bot_telcelventas.tbl_restandar SET EST_CDETALLE = 'subiendo', EST_CDETALLE2 = 'False' WHERE (PKEST_NCODIGO = '2');`
        // await con.promise().query(sqlUpdate);
        //req.app.io.emit('cargueMasivo', { msg: 'Nuevo cargador' });
        console.log("termina");
        res.json({ estado:"OK" })
      }

    }
  } catch (err) {
    if (err) console.log('Error al crear JSON', err);
  }

});

router.post('/selectEstadoCargueMasivo', (req, res) => {
  try{
      res.json(true)

  }catch (e){
    console.log("Ocurrio un error en la ruta: selectEstadoCargueMasivo", e);
  }

});




module.exports = router;