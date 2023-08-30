const
  router = require('express').Router(),
  keys = require("../../keys").database,
  con = require("../../database");


// render
router.get('/sinAcceso', (req, res) => {
  res.render('auth/err401', { title: 'Acceso Denegado' });
});






module.exports = router;