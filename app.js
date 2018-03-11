var express = require('express');
var app = express();
//var session = require('express-session');

/*app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));*/
  

app.get('/', function(req, res){
    res.sendFile(__dirname  + '/public/index.html');
});

app.get('/admin', function(req, res){
    res.sendFile(__dirname  + '/public/admin.html');
});

app.use(express.static(__dirname + '/public'));


module.exports = app;
