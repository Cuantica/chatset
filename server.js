var app = require('./app'); 
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var db = require('./db');


// Controllers
var ConversationController = require('./controllers/conversations');
var MessageController =  require('./controllers/messages');
var UserController = require('./controllers/users');


// socket.io connection and interactions
io.on('connection', function(client){
    console.log('Conexion de cliente');

    var userController = new UserController(io);
    var convController = new ConversationController(io);
    var msgController = new MessageController(io);

    client.on('conversation-historical', function(user){
        userController.listAll();
    });

    client.on('user-created', function(user){
        userController.newUser(user);
    });


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
var port = 3005;
http.listen(port, () => {
    console.log(`init server with the port : ${port} `);
});