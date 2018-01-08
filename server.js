var app = require('express')(); // Express module instance 
var server = require('http').createServer(app);
var io = require('socket.io')(server);



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

/**
 * -- Socket.io connection -- 
 * client param is a provider the event of a individual socket connexion
 */

io.on('connection', function(client){
    console.log('a user connected');
    
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


var port = 3002;
server.listen(port, () => {
    console.log(`init server with the port : ${port} `);
});
