var app = require('./app'); 
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var db = require('./db');


// controllers
var Conversation = require('./controllers/conversation');
var Message =  require('./controllers/message');

// socket.io connection
io.on('connection', function(client){
    console.log('user connected');
    //var conversation = new Conversation();
    var message = new Message();


    client.on('disconnect', function(){
        console.log('user disconnected');
    });

    client.on('chat message', function(msg){
        // validar los datos, para eso importaremos el modulo controlador user
        message.add_message(msg);
        console.log(msg);
        io.emit('chat message', msg);
    });

    /*io.on('broadcast', function(){
        console.log('Sending everyone');
    }); // emit an event to all connected sockets*/
});



// Inicializamos del servidor
var port = 3002;
server.listen(port, () => {
    console.log(`init server with the port : ${port} `);
});
