var mongoose = require('mongoose');
var ConversationModel = require('../models/Conversation');

var express = require('express');
var app = express();



// Archivo temporal, para obtener los lints de sockets io

function ConversationCtrl(io){
    this._io = io;
};

/** 
 * Adding a new message to the Conversation
 * @param listMembers
 */
ConversationCtrl.prototype.newConversation = function(listMembers){
    let members = [];
    membersObjectId.forEach(memberId => {
        members.push(mongoose.Types.ObjectId(memberId));
    });

    ConversationModel.create({
        members  : members,
        _created_up : new Date(),
        _update_up : new Date()
    }).then(data => {
        console.log(data)
    });

}

// Return the all message
/*ConversationCtrl.prototype.getConversation   = function(conversationId){
    /*ConversationModel.find({}, function(err, Conversation){
        console.log(Conversation);
    });
}*/



module.exports = ConversationCtrl;