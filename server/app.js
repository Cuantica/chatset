const express = require('express')
const app = express()
const http = require('http').createServer(app);
const fs = require('fs');
const path = require('path');
const sessionManager = require('./session-manager');

const multiparty = require('multiparty'); // Parse http requests with content-type multipart/form-data
const io = require('socket.io')(http, {
    path : '/sockets',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});
const db = require('./db');

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static(__dirname + '/../public')); 
app.use(sessionManager.sessionLogin)

app.use((req, res, next)=> {
    const { userId } = req.session 
    if (userId){
        res.locals.user = users.find((user) => { user.id === req.session.userId})
    }

    next()
})

// Routers
const webRouters = require('./web-routes')
const apiRouters = require('./web-routes')
app.use('/', webRouters)
app.use('/api/v1', apiRouters)

// -- Controladores --

var ConversationCtrl = require('./controllers/ConversationCtrl');
var UserCtrl = require('./controllers/UserCtrl');
var MessageCtrl = require('./controllers/MessageCtrl');


/**
 * @param client : Es una instancia de socket
 * @link https://socket.io/docs/server-api/#Socket
 */
io.on('connection', function(client){
    console.log('Usuario conectado')

    
    var userCtrl = new UserCtrl(client);
    var conversationCtrl = new ConversationCtrl(client);
    var messageCtrl = new MessageCtrl(client);

    client.on('conversation list', () => {
        conversationCtrl.listAllConversation()
    })
    

    client.on('conversation create', function(user){
        console.log('conversation create');
    })

    client.on('conversation open', function(user){
        console.log('conversation open');
        //let usersId = ['5aa7c9f1e8a304ddee5e6118', userId];
        //msgController.listAllMessageByUserId(usersId)
    })


    client.on('message add', function(user){
       // user.newUser(user);
       console.log('message add');
    });

    
    client.on('user register', function(msgComponent){
        msgController.newMessage(msgComponent);
    });


    client.on('user unregister', function(msgComponent){
        console.log('unregister');
    });

    // -- Contacts --
    client.on('list-message', function(userId){
        
    }); 


    client.on('disconnection', function(){
        console.log('Usuario desconectado');
    });
});

http.listen(3000, () => {
    console.log('Contenido de prueba')
})
