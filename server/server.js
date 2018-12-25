var app = require('./app'); 
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var db = require('./db');


// Controllers
var ConversationCtrl = require('./controllers/ConversationCtrl')(io);
var MessageCtrl =  require('./controllers/MessageCtrl')(io);
var UserCtrl = require('./controllers/UserCtrl')(io);

// socket.io connection and interactions
io.on('connection', function(client){
    console.log('Acceso al chat');
    
    /*var user = new UserCtrl(io);
    var conv = new ConversationCtrl(io);
    var message = new MessageCtrl(io);*/

    // Se lista historico de conversaciones
    client.on('conversation-historical', function(user){
        user.listAll();
    });

    // Create user and conversations
    client.on('user-created', function(user){
        user.newUser(user);
    });


    // Se recibe un mensaje
    client.on('chat-request-msg', function(msgComponent){
        msgController.newMessage(msgComponent);
    });

    // Busca mensajes por usuario    
    client.on('list-message', function(userId){
        let usersId = ['5aa7c9f1e8a304ddee5e6118', userId];
        msgController.listAllMessageByUserId(usersId)
    }); 

    client.on('disconnect', function(){
        console.log('Usuario desconectado');
    });
});



// Se Inicializa Servidor/Express
var port = 3003;
http.listen(port, () => {
    console.log(`init server with the port : ${port} `);
});