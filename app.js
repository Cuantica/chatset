var app = require('express')();
var session = require('express-session');

app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
  

app.get('/', function(req, res){
    res.sendFile(__dirname  + '/public/index.html');
    console.log(req.session.views);
});


module.exports = app;
