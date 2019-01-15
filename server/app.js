const express = require('express')
const app = express()
const http = require('http').createServer(app);
const fs = require('fs');
const sessionManager = require('./session-manager');


const io = require('socket.io')(http, {
    path : '/sockets',
  //  servesocket: false,
  //  pingInterval: 10000,
  //  pingTimeout: 5000,
  //  cookie: false
});
const db = require('./db');

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static(__dirname + '/../public')); 
app.use(sessionManager.sessionLogin)


// Routers
const webRouters = require('./web-routes')
const apiRouters = require('./api-routes')
app.use('/', webRouters)
app.use('/api/v1', apiRouters)
app.use((req, res, next) => {
  res.status(404).send('Error 404, Contenido no encontrado')
})

// -- Controladores --
var ConversationCtrl = require('./controllers/ConversationCtrl');
var UserCtrl = require('./controllers/UserCtrl');
var MessageCtrl = require('./controllers/MessageCtrl');


/**
 * @param socket
 * @link https://socket.io/docs/server-api/#Socket
 */
io.on('connection', function(socket){
    
    var userCtrl = new UserCtrl();
    var conversationCtrl = new ConversationCtrl();
    var messageCtrl = new MessageCtrl();

    socket.on('conversation list', () => {
        conversationCtrl.listAllConversation().then(res => {
            socket.emit('conversation list', res)
        }, err => {
            console.log(err)
        })
    })
    

    socket.on('conversation create', function(user){
        console.log('conversation create');
    })


    /**
     * Abre una conversacion
     * @param conversationId
     */
    socket.on('conversation open', function(conversationId){
        messageCtrl.listMessageByConversation(conversationId, null).then(res => {
            socket.emit('message list', res)
        },err => {
            console.log(err)
        })
    })



    socket.on('message add', function(user){
       // user.newUser(user);
       console.log('message add');
    });

    
    socket.on('user register', function(msgComponent){
        msgController.newMessage(msgComponent);
    });


    socket.on('user unregister', function(msgComponent){
        console.log('unregister');
    });


    socket.on('disconnection', function(){
        console.log('Usuario desconectado');
    });
});

http.listen(3000, () => {
    console.log('Server ready ;)')
})
