const express = require("express");
const app = express();
const fs = require("fs");
const porta = 3000;
const mysql = require('mysql');

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

app.get("/v1", (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'senha',
        database: 'Baleias',
        port: 3306
    });

    connection.query('SELECT * from Orcas', function(err, rows, fields) {
        if(err) console.log(err);
        res.send(rows);
        connection.end();
    });
});
