var mongoose = require('mongoose');
var ConversationModel = require('../models/Conversation');

var express = require('express');
var app = express();


function ConversationCtrl(io){
    this._io = io;
};

/** 
 * Agrega un mensaje a una conversacion
 * @param listMembers - Recibe el listado de miembros para la conversacion (Solo los identificadores ObjectsId)
 */
ConversationCtrl.prototype.newConversation = function(listMembersParam, typeParam = 'user'){
    let listMembers = [];
    listMembersParam.forEach(memberId => {
        listMembers.push(mongoose.Types.ObjectId(memberId));
    });
    
    ConversationModel.create({
        members : listMembers,
        messages : [],
        type : typeParam,
        _created_up : new Date(),
        _update_up : new Date()
    }).then(data => {
        console.log(data);
    });
}

// Return the all message
/*ConversationCtrl.prototype.getConversation   = function(conversationId){
    /*ConversationModel.find({}, function(err, Conversation){
        console.log(Conversation);
    });
}*/



module.exports = ConversationCtrl;