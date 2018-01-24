var app = require('./app'); 
var server = require('http').createServer(app);
var io = require('socket.io')(server);


// controllers
var conversation = require('./controllers/conversation');


// socket.io connection
io.on('connection', function(client){
    conversation();
    console.log('Coneccion');

    client.on('disconnect', function(){
        console.log('user disconnected');
    });

    client.on('chat message', function(data){
        //console.log(data);
        io.emit('chat message', data);
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
