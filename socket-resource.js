
/*
SocketResource = function(io){

    // socket.io connection
    io.on('connection', function(client){
        console.log('user connected');
        var message = new Message();

        // new User
        this.User.newUser();

        // Se crea un usuario nuevo
        


        /*client.on('disconnect', function(){
            console.log('user disconnected');
        });

        client.on('chat message', function(msg){
            // validar los datos, para eso importaremos el modulo controlador user
            message.add_message(msg);
            io.emit('chat message', msg);
        });*/

        /*io.on('broadcast', function(){
            console.log('Sending everyone');
        }); // emit an event to all connected sockets
    });
}

SocketResource.prototype.User = function(client){

    function listUser(){
        io.emit('test',  UserController.listAll());
    }
    
    function newUser(){
        client.on('user-send-data', function(user){
            UserController.newUser(user);
            io.emit('user-new','usuario nuevo');
        });
    }

}

module.exports = new SocketResource();*/