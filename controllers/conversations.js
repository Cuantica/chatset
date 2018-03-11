var ConversationModel = require('../models/conversation');
var Conversation = function(){};

// Adding a new message to the Conversation
Conversation.prototype.newConversation = function(members){
    ConversationModel.create(members);
}

// Return the all message
Conversation.prototype.getConversation   = function(){
    /*ConversationModel.find({}, function(err, Conversation){
        console.log(Conversation);
    });*/
}

module.exports = new Conversation();