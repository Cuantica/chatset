var app = require('./app'); 
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var db = require('./db');


// controllers
var Conversation = require('./controllers/conversations');
var Message =  require('./controllers/messages');
var UserController = require('./controllers/users');


// socket.io connection and interactions
io.on('connection', function(client){
    console.log('user connected');
    var message = new Message();
    var userController = new UserController(io);

    // Se lista historico de conversaciones
    client.on('user-admin-login', function(user){
        userController.listAll();
    });

    // Se busca crear un usuario nuevo
    client.on('user-send-data', function(user){
        userController.newUser(user);
    });

    // Se recibe un mensaje
    client.on('chat message', function(msgComponent){
        // validar los datos, para eso importaremos el modulo controlador user
        //message.add_message(msg);
        console.log(msgComponent);

        //io.emit('chat message', msgComponent);
    });

    /*io.on('broadcast', function(){
        console.log('Sending everyone');
    }); // emit an event to all connected sockets*/

    client.on('disconnect', function(){
        console.log('user disconnected');
    });
});



// Inicializamos del servidor
var port = 3002;
server.listen(port, () => {
    console.log(`init server with the port : ${port} `);
});
