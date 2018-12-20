var mongoose = require('mongoose');
var ConversationModel = require('../models/conversation');

function ConversationCtrl(io){};

// Adding a new message to the Conversation
ConversationCtrl.prototype.newConversation = function(membersObjectId){
    let members = [];
    membersObjectId.forEach(memberId => {
        members.push(mongoose.Types.ObjectId(memberId));
    });

    ConversationModel.create({
        conv_members  : members,
        _created_up : new Date(),
        _update_up : new Date()
    }).then(data => {
        console.log(data)
    });
}

// Return the all message
ConversationCtrl.prototype.getConversation   = function(conversationId){
    /*ConversationModel.find({}, function(err, Conversation){
        console.log(Conversation);
    });*/
}

module.exports = ConversationCtrl;