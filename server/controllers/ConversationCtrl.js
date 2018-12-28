var mongoose = require('mongoose');

var express = require('express');
var app = express();

// -- Modelos --
var ConversationModel = require('../models/Conversation');
var MessageModel = require('../models/Message');



function ConversationCtrl(io){
    this._io = io;
};

/** 
 * Agrega un mensaje a una conversacion
 * @param conversationParam - Recibe los datos de la conversation
 */
ConversationCtrl.prototype.newConversation = function(conversationParam){
    listMembers = []; // Miembros de la conversacion

    try {
        let listUsers = conversationParam.members;
        if (listUsers.lenght <= 1){
            throw("Problema con la cantidad de integrantes");
        }

        listUsers.forEach(userId => {
            listMembers.push(mongoose.Types.ObjectId(userId));
        });

        console.log(listMembers);
    
        ConversationModel.create({
            members : listMembers,
            messages : [],
            type_conversation : conversationParam.type_conversation,
            title_conversation : conversationParam.title_conversation,
            _update_up : Date.now()
        }).then(data => {
           // console.log(data);
           console.log("Se creo la conversacion");
        });

    } catch (error) {
        console.log('Error: ', error)
    }

    
    console.log(ConversationModel._id);
    //MessageModel.create
}

// Return the all message
/*ConversationCtrl.prototype.setConversation   = function(conversationId){
    /*ConversationModel.find({}, function(err, Conversation){
        console.log(Conversation);
    });
}*/



module.exports = ConversationCtrl;