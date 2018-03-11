var MessageModel = require('../models/message');
function Message(io){};

// Adding a new Message
Message.prototype.newMessage = function(msgComponent){
    /*MessageModel.create({
        from : "", 
        to : "Eliana",
        date : new Date(),
        content : message,
        conv_id : 
    });*/
}

Message.prototype.listAllByConversation = function(){
    MessageModel.find({})
}


module.exports = new Message();