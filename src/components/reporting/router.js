const router = require('express').Router(),
  keys = require("../../keys").database,
  con = require("../../database");
const os = require('os');
const comunes = require('../../routes/funciones/comunes');
const { spawn, exec } = require('child_process');
const fs = require('fs');




router.get("/report", (req, res) => {
  res.render("reporting/reporting", { title: 'reporting', dash:true});
});



router.post('/getAllDatosTarjetas', async (req, res) => {
  try {
    const sqlSelectProgram = `SELECT count(distinct(REG_CPROGRAMA)) as programa FROM dbp_ged.tbl_rregistros;`;
    let [resSelectProgram] = await con.promise().query(sqlSelectProgram);
    const sqlSelectEstudent = `SELECT count(distinct(REG_CEMPLID)) as estudent FROM dbp_ged.tbl_rregistros;`;
    let [resSelectEstudent] = await con.promise().query(sqlSelectEstudent);
    const sqlSelectMaterias = `SELECT count(distinct(REG_CMATERIA)) as materia FROM dbp_ged.tbl_rregistros;`;
    let [resSelectMaterias] = await con.promise().query(sqlSelectMaterias);
    res.json({program:resSelectProgram[0].programa,estudent:resSelectEstudent[0].estudent,materia:resSelectMaterias[0].materia})
  } catch (e) {
    console.error("EROR EN RUTA selectFiltroDashArchivos: " + e);
  }

});

router.post('/getDatosDashEstudent', async (req, res) => {
  try {
    const sqlSelectEstudent = `SELECT distinct REG_CEMPLID, REG_CNOMBRE, REG_CMATERIA, REG_CCICLO, REG_CNOTA_PR, REG_CNOTA_SEC, REG_CNOTA_TER, REG_CNOTA_DEF FROM dbp_ged.tbl_rregistros;`;
    let [result] = await con.promise().query(sqlSelectEstudent);
    res.json(result)
  } catch (e) {
    console.error("EROR EN RUTA selectFiltroDashArchivos: " + e);
  }

});

router.post('/getDatosDashProgram', async (req, res) => {
  try {
    const sqlSelectEstudent = `SELECT distinct(REG_CPROGRAMA) as programa, REG_CCICLO FROM dbp_ged.tbl_rregistros;`;
    let [result] = await con.promise().query(sqlSelectEstudent);
    res.json(result)
  } catch (e) {
    console.error("EROR EN RUTA selectFiltroDashArchivos: " + e);
  }

});

router.post('/getDashPie', async (req, res) => {
  try {
    let  nombre = `${req.body.nombre}`;
    const sqlSelectEstudent = `select count(distinct(REG_CNOMBRE)) as perdieron from dbp_ged.tbl_rregistros where REG_CPROGRAMA = "${nombre}" AND ((REG_CNOTA_PR+REG_CNOTA_SEC+REG_CNOTA_TER)/3) < 3.0;`;
    let [perdieron] = await con.promise().query(sqlSelectEstudent);
    const sqlSelectEstudentW = `SELECT count(distinct(REG_CNOMBRE)) as total FROM dbp_ged.tbl_rregistros WHERE REG_CPROGRAMA = "${nombre}";`;
    let [pasaron] = await con.promise().query(sqlSelectEstudentW);
    res.json({perdieron, pasaron})
  } catch (e) {
    console.error("EROR EN RUTA getDashPie: " + e);
  }

});

router.post('/selectFiltroPie', async (req, res) => {
  try {
    const sqlSelectEstudent = `SELECT distinct(REG_CPROGRAMA) as programa FROM dbp_ged.tbl_rregistros;`;
    let [program] = await con.promise().query(sqlSelectEstudent);
    res.json(program)
  } catch (e) {
    console.error("EROR EN RUTA selectFiltroDashArchivos: " + e);
  }

});

router.post('/getDashRadar', async (req, res) =>{
  try {
  let  nombre = `${req.body.nombre}`;
  let sqlSelect = `SELECT REG_CMATERIA, COUNT(*) AS CANTIDAD FROM dbp_ged.tbl_rregistros WHERE REG_CPROGRAMA = "${nombre}" AND ((REG_CNOTA_PR+REG_CNOTA_SEC+REG_CNOTA_TER)/3) < 3.0 GROUP BY REG_CMATERIA ORDER BY CANTIDAD DESC LIMIT 5`
  let [result] = await con.promise().query(sqlSelect);
  res.json(result)
  } catch (e) {
  console.error("EROR EN RUTA getLista: " + e);
}
})
router.post('/getLista', async (req, res) =>{
  try {
  let  nombre = `${req.body.nombre}`;
  let sqlSelect = `select perdieron.REG_CMATERIA, perdieron.CANTIDAD as perdieron, pasaron.CANTIDAD pasaron from (SELECT REG_CMATERIA, COUNT(DISTINCT(REG_CEMPLID)) AS CANTIDAD FROM dbp_ged.tbl_rregistros WHERE REG_CPROGRAMA = "${nombre}" AND ((REG_CNOTA_PR+REG_CNOTA_SEC+REG_CNOTA_TER)/3) < 3.0 GROUP BY REG_CMATERIA ORDER BY CANTIDAD DESC ) perdieron, (SELECT REG_CMATERIA, COUNT(DISTINCT(REG_CEMPLID)) AS CANTIDAD FROM dbp_ged.tbl_rregistros WHERE REG_CPROGRAMA = "${nombre}"  AND ((REG_CNOTA_PR+REG_CNOTA_SEC+REG_CNOTA_TER)/3) > 2.9 GROUP BY REG_CMATERIA ORDER BY CANTIDAD) pasaron where  pasaron.REG_CMATERIA = perdieron.REG_CMATERIA ORDER BY perdieron desc;`
  let [result] = await con.promise().query(sqlSelect);
  res.json(result)
  } catch (e) {
  console.error("EROR EN RUTA getLista: " + e);
}
})
router.post('/getListaEstudent', async (req, res) =>{
  try {
  let  nombre = `${req.body.nombre}`;
  let  carrera = `${req.body.carrera}`;
  let sqlSelect = `SELECT distinct(REG_CEMPLID), REG_CNOMBRE, REG_CNOTA_DEF as definitiva FROM dbp_ged.tbl_rregistros where REG_CMATERIA="${nombre}" and REG_CPROGRAMA = "${carrera}" order by definitiva desc;`
  let [result] = await con.promise().query(sqlSelect);
  res.json(result)
  } catch (e) {
  console.error("EROR EN RUTA getLista: " + e);
}
})

router.post('/getDashBar', async (req, res) =>{
  try {
  let  nombre = `${req.body.nombre}`;
  let sqlSelect = `SELECT MateriasPerdidas, COUNT(MateriasPerdidas) AS CANTIDAD FROM (SELECT REG_CNOMBRE, count(distinct(REG_CMATERIA)) AS MateriasPerdidas  FROM dbp_ged.tbl_rregistros WHERE REG_CPROGRAMA = "${nombre}" AND ((REG_CNOTA_PR+REG_CNOTA_SEC+REG_CNOTA_TER)/3) < 3.0 GROUP BY REG_CNOMBRE) TABLA GROUP BY MateriasPerdidas`
  let [result] = await con.promise().query(sqlSelect);
  res.json(result)
  } catch (e) {
  console.error("EROR EN RUTA getDashBar: " + e);
}
})

module.exports = router;