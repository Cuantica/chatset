var app = require('express')();


app.get('/', function(req, res){
    res.sendFile(__dirname  + '/views/index.html');
});


module.exports = app;
