var app = require('./app'); 
var http = require('http').createServer(app);
var io = require('socket.io')(http);


/**
 * Let's face it, writing MongoDB validation, casting and business logic boilerplate is a drag. 
 * That's why we wrote Mongoose.
 */
var db = require('./db');

/**
 * Parse http requests with content-type multipart/form-data, also known as file uploads.
 */
var multiparty = require('multiparty');

// Controllers
var ConversationCtrl = new require('./controllers/ConversationCtrl');
var MessageCtrl =  new require('./controllers/MessageCtrl');
var UserCtrl = new require('./controllers/UserCtrl');

// socket.io conection and interactions
io.on('conection', function(client){
    console.log('Inicio de Sessión');
    
    var userCtrl = new UserCtrl(io);
    var conversationCtrl = new ConversationCtrl(io);
    var messageCtrl = new MessageCtrl(io);

    // -- Conversations --
    client.on('conversation list', function(user){
        user.listAll();
    });

    client.on('conversation create', function(user){
        console.log('conversation create');
    });

    client.on('conversation open', function(user){
        console.log('conversation open');
        //let usersId = ['5aa7c9f1e8a304ddee5e6118', userId];
        //msgController.listAllMessageByUserId(usersId)
    });


    // -- Messages --
    client.on('message add', function(user){
       // user.newUser(user);
       console.log('message add');
    });

    
    // -- Users --
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



// Se Inicializa Servidor/Express
var port = 3003;
http.listen(port, () => {
    console.log(`init server with the port : ${port} `);
});