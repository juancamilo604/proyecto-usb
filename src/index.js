const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const { database } = require('./keys');
const { isLoggedIn, error404, error401 } = require('./lib/auth');
const fileUpload = require('express-fileupload');
const socket = require('socket.io')
const http = require('http')
const bodyParser = require('body-parser');
const router = require('./routes');
const cookieParser = require('cookie-parser'); // Nuevo modulo para el cambio de el passport




// * init
const app = express();


require('./lib/passport');

// * public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../node_modules/boxicons/')));
app.use(express.static(path.join(__dirname, '../node_modules/socket.io/client-dist/')));
app.use(express.static(path.join(__dirname, '../node_modules/materialize-css/dist')));
app.use(express.static(path.join(__dirname, '../node_modules/chart.js/dist')));
app.use(express.static(path.join(__dirname, '../node_modules/sweetalert2/dist')));
app.use(express.static(path.join(__dirname, '../node_modules/datatables.net/js')));
app.use(express.static(path.join(__dirname, '../node_modules/datatables.net-bs4')));

// * settings
app.set('PORT', process.env.PORT || 8003);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
  })
);
app.set('view engine', '.hbs');

// * middleware
app.use(cookieParser("secret")) // (descomentar)
// const { database } = require('./keys'); // (ocultar en prod)

app.use(
  session({
    secret: 'appmysql',
    resave: false,
    saveUninitialized: false,
    // store: new MySqlStore(database), // (ocultar en prod)
  })
);
// app.use(cors())
app.use(flash());
app.use(morgan('dev'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: false })); // aceptar datos sencillos
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// * global Variables
app.use((req, res, next) => {
  app.locals.messageSuccess = req.flash('messageSuccess');
  app.locals.messageInfo = req.flash('messageInfo');
  app.locals.messageWarning = req.flash('messageWarning');
  app.locals.messageError = req.flash('messageError');
  app.locals.user = req.user;
  app.locals.server = req.user;
  next();
});

// routes
router(app);

if (require.main === module) {
  const server = app.listen(app.get('PORT'), () => {
    console.log(`Server on port ${app.get('PORT')} - http://localhost:${app.get('PORT')}`);
  });

  //Socket
const io = socket(server);
io.on('connection', (socket) => {
  //console.log('socket connection opened:', socket.id);
  
  socket.on('estadoPython', function(data) {
    io.sockets.emit('estadoPython', data);
  });

  socket.on('status', function(data) {
    socket.broadcast.emit('status', data);
  });

  socket.on('cargueMasivo', function(data) {
    console.log("entra en el sockettt");
    socket.broadcast.emit('cargueMasivoFinalizado', data);
  });
  socket.on('change:Bot', function(data) {
    socket.broadcast.emit('change:BotPython', data);
  });
  

  socket.on('disconnect', () => {
    console.log("bot descnonectado");
  });
  app.socket = socket; // se establece para poder ser accedida desde los request de las rutas

});
app.io = io; // se establece para poder ser accedida desde los request de las rutas


}
// * Enlargue de subida de archivos
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: false,
}))

// * 404
app.use(error404);
app.use(error401);

// * 500
app.use(function (err, req, res, next) {
  res.status(500);
  res.send({
    mensaje: err.message,
    error: err
  });
});



module.exports = app