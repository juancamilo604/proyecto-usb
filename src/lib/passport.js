const passport = require("passport");
const LocalStratregy = require("passport-local").Strategy;
//Controler
const controller = require('../components/auth/controller');



passport.use("local.login", new LocalStratregy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  },
   async (req, Usuario, Password, done) => {
    var res = await controller.match(Usuario,Password)
    console.log(res);
    try{
      if (res.estado){
        done(null, res.user, req.flash("messageSuccess", "Welcome"));
      }else{
        done(null,false, req.flash("messageError", "Verifique el usuario y la contraseña"));
      }
    }catch (e) {
      done(null,false, req.flash("messageError", "Verifique el usuario y la contraseña"));

    }

  }
)
);




passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  //console.log(user);
  done(null, user);
})
