var MessageModel = require('../models/message');
function Message(io){
    this._io = io;
};

// Adding a new Message
Message.prototype.newMessage = function(msgComponent){
    msgComponent['_created_up'] = new Date();
    msgComponent['content'] = msgComponent['text'];
    console.log(msgComponent);
    MessageModel.create(msgComponent).then(message => {
        this._io.emit('chat message', message);
    });
}


Message.prototype.listAllMessageByUserId = function(usersId){
    MessageModel.find({
        'user_id' : { $in : usersId}  
    }, function(err, messages){
        console.log(messages);
    });
}

module.exports = Message;