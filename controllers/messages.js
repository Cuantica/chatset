var MessageModel = require('../models/message');

function Message(io){
    this._io = io;
};

// Adding a new Message
Message.prototype.newMessage = function(msgComponent){
    msgComponent['_created_up'] = new Date();
    msgComponent['content'] = msgComponent['text'];

    // Si el usuario
    MessageModel.create(msgComponent).then(message => {
        this._io.emit('chat message', message);
    });
}


Message.prototype.listAllMessageByUserId = function(usersId){
    let _io = this._io;
    MessageModel.find({
        'user_id' : { $in : usersId}  
    }, function(err, messages){
        for (const index in messages) {
            if (messages.hasOwnProperty(index)) {
                const msg = messages[index];
                _io.emit('chat message', msg);
            }
        }
    });
}

module.exports = Message;