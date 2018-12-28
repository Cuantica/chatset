var express = require('express');
var app = express();
var fs = require('fs');

// -- Configuraciones --

app.use(express.static(__dirname + '/public'));  // Se configura path public, para assets 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// -- Controladores --

var ConversationCtrl = require('./controllers/ConversationCtrl');
var UserCtrl = require('./controllers/UserCtrl');

app.get('/', function(req, res){
    let packageInfo;

    fs.readFile(__dirname + "/../package.json", (err, data) => {
        if (err){
            console.log("error ", err);
            return;
        }
        else {
            packageInfo = JSON.parse(data);
            res.json({
                "msg" : packageInfo.name,
                "version" : packageInfo.version
            });
        }
    });

});


app.post('/users', function(req, res){

    let userCtrl = new UserCtrl();
    userCtrl.newUser(req.body);

    return res.json(req.body);
});

app.post('/conversations', function(req, res){
    let conversationCtrl = new ConversationCtrl();
    conversationCtrl.newConversation(req.body);
    res.json(req.body);
});

app.post('/messages', function(req, res){
    /*res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept', 'application/json');

    let ConversationCtrl = new ConversationCtrl();
    res.jsonp({
        "msg" : "Conversacion creada correctamente"
    });    
    */
});


/*app.get('/panel', function(req, res){
    res.sendFile(__dirname  + '/public/dashboard-chat.html');
});*/

module.exports = app;

