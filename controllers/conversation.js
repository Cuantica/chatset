var ConversationModel = require('../models/conversation');
var conversation = function(){};

// Adding a new message to the conversation
conversation.prototype.add_message = function(){
    this.conversation = conversation.create({
        participants : ['Ivan', 'Eliana']
    });
}

// Getting the new conversation
conversation.prototype.get_conversation = function(){
    this.conversation.find
}

// Return the all message
conversation.prototype.list_message = function(){
    /*ConversationModel.find({}, function(err, conversation){
        console.log(conversation);
    });*/
}

module.exports = conversation;