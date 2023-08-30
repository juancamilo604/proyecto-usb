const keys = require("../../keys").database;
const con = require("../../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;




async function match(user, pass) {
    const SQL_SELECT1 = `SELECT PER_CCONTRASENA, PER_CUSUARIO, PER_CPERMISO FROM ${keys.database}.tbl_rpermiso where PER_CUSUARIO = '${user}';`
    let [resSelect] = await con.promise().query(SQL_SELECT1);
    console.log(SQL_SELECT1);
    if (resSelect.length > 0) {
        let password = resSelect[0].PER_CCONTRASENA
        const match = await bcrypt.compare(pass, password);
        if (match) {
            console.log("SIIII");
            user = {
                PER_CUSUARIO:resSelect[0].PER_CUSUARIO,
                PER_CPERMISO:resSelect[0].PER_CPERMISO
            }
            result = {
                estado: true,
                user: user
            }
            return result
        }
    }
    result = {
        estado: false,
        user: ""
    }
    return result
}

async function createPassword(pass) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(pass, salt, function (err, hash) {
            console.log(err);
            console.log(hash);
            result = {
                estado: false,
                user: ""
            }
            // Store hash in your password DB.
        });
    });
};

//createPassword("123456789")

module.exports = {
    match,
};