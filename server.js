var app = require('./app'); 
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var db = require('./db');


// controllers
var ConversationController = require('./controllers/conversations');
var MessageController =  require('./controllers/messages');
var UserController = require('./controllers/users');


// socket.io connection and interactions
io.on('connection', function(client){
    var userController = new UserController(io);
    var convController = new ConversationController(io);
    var msgController = new MessageController(io);

    // Se lista historico de conversaciones
    client.on('user-admin-login', function(user){
        userController.listAll();
    });

    // Create user and conversations
    client.on('user-send-data', function(user){
        userController.newUser(user);
    });

    // Se recibe un mensaje
    client.on('chat message', function(msgComponent){
        console.log(msgComponent);
        msgController.newMessage(msgComponent);
    });

    // Busca mensajes por usuario    
    client.on('list-message', function(userId){
        let usersId = ['5aa7c9f1e8a304ddee5e6118', userId];
        msgController.listAllMessageByUserId(usersId)

        client.emit()
    }); 

    client.on('disconnect', function(){
        console.log('user disconnected');
    });
});



// Inicializamos del servidor
var port = 3003;
/*server.listen(port, () => {
    console.log(`init server with the port : ${port} `);
});*/
server.listen(port);