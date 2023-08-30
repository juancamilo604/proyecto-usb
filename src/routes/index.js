const auth = require('../components/auth/router');
const cargador = require('../components/cargador/router');
const permisos = require('../components/permisos/router');
const reporting = require('../components/reporting/router');
const { isLoggedIn} = require('../lib/auth');


const routess = function (app) {
    app.use('/', auth);
    app.use(isLoggedIn); // No entrar a las rutas sin logearse, redirecciona al Login
    app.use('/cargue', cargador);
    app.use('/permisos', permisos);
    app.use('/reporting', reporting);
}

module.exports = routess;
