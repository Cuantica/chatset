var MessageModel = require('../models/Message');
var ConversationModel = require('../models/Conversation');

function MessageCtrl(io){
    this._io = io;
};

// Adding a new Message
MessageCtrl.prototype.newMessage = function(msgComponent){
    msgComponent['_created_up'] = new Date();
    msgComponent['content'] = msgComponent['text'];

    // Si el usuario
    MessageModel.create(msgComponent).then(message => {
        this._io.emit('chat message', message);
    });
}

// Listado de Mensajes por conversacion
MessageCtrl.prototype.listMessageByConversation = function(usersId){
    let _io = this._io;
    
    /*MessageModel.find({
        'user_id' : { $in : usersId}  
    }, function(err, messages){
        for (const index in messages) {
            if (messages.hasOwnProperty(index)) {
                const msg = messages[index];
                _io.emit('chat message', msg);
            }
        }
    });*/
    ConversationModel.findById
}

module.exports = MessageCtrl;