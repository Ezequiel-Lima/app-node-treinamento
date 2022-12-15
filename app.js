const express = require("express");
const app = express();
const fs = require("fs");
const porta = 3000;
const mysql = require('mysql');
const { MongoClient } = require('mongodb');

app.get("/", (req, res) => {
  res.send("Olá mundo");

  const mensagem = `${new Date().toISOString()} : chegou o request`;
  console.log(mensagem);

  var logStrem = fs.createWriteStream('logs/log.app.txt', { flags: 'a' });
  logStrem.write(mensagem);
  logStrem.end('\n');
});

app.listen(porta, () => {
  console.log(`Escutando na porta : ${porta}`);
});

app.get("/v1", async (req, res) => {

  const connection = () => MongoClient
    .connect("mongodb://quiel:e296cd9f@0.0.0.0:27017",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then((conn) => conn.db("meubanco"), console.log("conectado!"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
  const db = await connection();
  var users = await db.collection("user").find().toArray();

  res.send(users);

  //mongoose.connect('mongodb://adm:123@localhost:27017');

  // mongoose.connect(
  //     process.env.MONGODB_URI || "mongodb://adm:123@localhost:27017/meubanco",
  //     {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     },
  //     (err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //        // const usuario =  db.user.find({})
  //        // res.send(usuario)
  //         res.send("Connected to MongoDB");
  //       }
  //     }
  //   );

  // var connection = mysql.createConnection({
  //     host: 'localhost',
  //     user: 'root',
  //     password: 'senha',
  //     database: 'Baleias',
  //     port: 3306
  // });

  // connection.query('SELECT * from Orcas', function(err, rows, fields) {
  //     if(err) console.log(err);
  //     res.send(rows);
  //     connection.end();
  // });
});
