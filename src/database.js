const mysql = require("mysql2");
const { database } = require("./keys");
const db = require('./keys').database.database;

// require("dotenv").config();

let conn = mysql.createConnection({
  host: database.host,
  user: database.user,
  database: database.database,
  password: database.password,
  dateStrings: true,
});

// * Valida si se desconecta Node y DB
// conn.end();
try {
  conn.query("SELECT 1");
  console.log("Connected DB ", database.host);
  const sql = `SELECT * FROM ${db}.tbl_rpermiso LIMIT 1`;
  setInterval(() => {
    conn
      .promise()
      .query(sql)
      .then(([result, fields]) => {
        console.log("Todo Correcto");
      })
      .catch((err) => console.log("ERROR::", err));
  }, 3600000);

} catch (error) {
  if (error) {
    let posicion = error.message.indexOf("Can't add new command when connection is in closed state");
    if (posicion !== -1) {
      console.log("Disconnected DB :(");
      conn = mysql.createConnection({
        host: database.host,
        user: database.user,
        database: database.database,
        password: database.password,
        dateStrings: true,
      });
      console.log("Reconected DB (☞ﾟヮﾟ)☞");
    }
  }
}

module.exports = conn;
