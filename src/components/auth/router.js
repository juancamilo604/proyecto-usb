const express = require('express');
const passport = require('passport');
const controller = require('./controller');
const router = express.Router();
const {isNotLoggedIn, isLoggedIn } = require('../../lib/auth');

// Login local

router.post("/login",isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next);
});

router.get("/login",isNotLoggedIn, (req, res) => {
    res.render("auth/login", { title: "Login", login: true });
});

router.get("/",isLoggedIn, (req, res) => {
    res.render("vistaWelcome", { title: "Login", login: true });
});

router.get("/logout", async (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});



module.exports = router;