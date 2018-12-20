var express = require('express');
var app = express();
var session = require('express-session');

app.set('view engine', 'pug');

app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true,
}));

// Se configura path public, para assets
app.use(express.static(__dirname + '/public'));  

// Rutas
app.get('/', function(req, res){
    res.send("Chatset admin");
});


app.get('/panel', function(req, res){
    res.sendFile(__dirname  + '/public/dashboard-chat.html');
});

module.exports = app;
