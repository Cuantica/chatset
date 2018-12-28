var express = require('express');
var app = express();

//var session = require('express-session');

//app.set('view engine', 'pug');

/*app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true,
}));*/



app.use(express.static(__dirname + '/public'));  // Se configura path public, para assets 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


var ConversationCtrl = require('./controllers/ConversationCtrl');
var UserCtrl = require('./controllers/UserCtrl');

app.get('/', function(req, res){
    let conversation = new ConversationCtrl();
    res.send("Chatset admin");
});


app.post('/users', function(req, res){
    //res.setHeader('Content-Type', 'application/json');
    //res.setHeader('Accept', 'application/json1');

    let userCtrl = new UserCtrl();
    //userCtrl.newUser(req.params);

    /*try {
        let userCtrl = new UserCtrl();
        userCtrl.newUser({
            name : 'Ricardo Medina',
            mail : '',
            phone : '0981123456',
            username : 'rmedina',
            profile_image : null,
            password : null,
            token : '6',
            conversations : null,
        });

        res.jsonp({
            "msg" : "Se creo usuario corretamente"
        });
            
    } catch (error) {
        res.jsonp({
            "msg" : error
        });
    }
    */

    res.send(req);
    //res.send(req.param("name"));
});

app.post('/conversations', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept', 'application/json');

    let conversationCtrl = new ConversationCtrl();
    conversationCtrl.newConversation({
        members : [ { 
            type: mongoose.Schema.Types.ObjectId , 

            ref : 'User'} 
        ],
        type : 'group', // User or Group
        _created_up : new Date(),
        _update_up : new Date()
    })
    res.jsonp({
        "msg" : "Conversacion creada correctamente"
    });    

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

