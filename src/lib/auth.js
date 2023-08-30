module.exports = {
  isLoggedIn(req, res, next) {
    // * Valida si esta logeado, de lo contrario manda al Login
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect("/login");
    }
  },
  isNotLoggedIn(req, res, next) {
    // * SI ya esta logeado y va al Login lo manda al Inicio
    if (!req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect("/");
    }
  },
  error404(req, res) {
    res.status(404).render("auth/err404", { err404: true, title: "Error 404" });
  },
  error401(req, res) {
    res.status(401).render("auth/err401", { err401: true, title: "Error 401" });
  },
  isAdministradorSupervisor(req, res, next) {
    let rol = req.user.PER_CNIVEL;
    if (rol === "Administrador" || rol === 'Supervisor') {
      next();
    } else {
      // res.status(401).json({ error: 401, message: "Acceso Denegado" });
      res.render('auth/err401', { title: 'Acceso Denegado' });
    }
  },
};
