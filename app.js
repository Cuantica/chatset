var express = require('express');
var app = express();
var session = require('express-session');


app.set('view engine', 'pug');

app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true,
}));
  

app.get('/', function(req, res){
    //req.session.cuenta = req.session.cuenta? req.session.cuenta + 1 : 1;

    //res.send(`Cant veces ${req.session.cuenta}`);
    res.sendFile(__dirname  + '/public/index.html');
});

app.get('/admin', function(req, res){
    res.sendFile(__dirname  + '/public/admin.html');
});



app.get('/login', function(req, res){
    res.sendFile(__dirname  + '/public/login.html');
});


app.use(express.static(__dirname + '/public'));


module.exports = app;
