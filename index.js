require('dotenv').config();

const mysql = require('mysql');
const config = require('./config.js');
const queries = require('./queries');
const connection = mysql.createConnection(config);

connection.query(queries.createTable, (err, results, fields) => {
    if (err) console.error(err);
});

const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    connection.query(queries.getAll, (err, results, fields) => {
        if (err) console.error(err);
        res.render('pages/index', { todos: results });
    });
});

app.post('/addtodo', (req, res) => {
    const todo = req.body.todo;
    connection.query(queries.addTodo, [todo], (err, results, fields) => {
        if (err) console.error(err);
    });
    res.redirect('/');
});

app.listen(8000, () => {
    console.log('Server up on port 8000');
});

process.on('beforeExit', () => {
    connection.end();
});
