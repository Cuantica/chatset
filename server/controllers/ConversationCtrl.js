const mongoose = require('mongoose');

const express = require('express');
const app = express();

// -- Modelos --
const ConversationModel = require('../models/Conversation');
const MessageModel = require('../models/Message');



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

        ConversationModel.create({
            members : listMembers,
            messages : [],
            type_conversation : conversationParam.type_conversation,
            title_conversation : conversationParam.title_conversation,
            _update_up : Date.now()
        }).then(data => {
           console.log("Se creo la conversacion");
        });

    } catch (error) {
        console.log('Error: ', error)
    }

    
    
    //MessageModel.create
}

// Return the all message
/*ConversationCtrl.prototype.setConversation   = function(conversationId){
    /*ConversationModel.find({}, function(err, Conversation){
        console.log(Conversation);
    });
}*/


/**
 * Listado de conversaciones por usuario
 */
ConversationCtrl.prototype.listConversationByUser = function(userId){
    let userObjectID = mongoose.Types.ObjectId(userId);
    ConversationModel.find({"members" : userObjectID}, (err, res) => {
        /*this._io.broadcast.emit('conversation list', {
            conversationList: socket.username,
        });*/
        console.log(res)
    }) 
}

/**
 * Todas las conversaciones
 */
ConversationCtrl.prototype.listAllConversation = () => {
    let io = this._io

    ConversationModel.find({}, (err, res) => {
        /*io.emit('conversation list', {
            conversationList: socket.username,
        });*/
        console.log('Listado de conversacion');
    })
}



ConversationCtrl.prototype.appendMessageToConversation = (conversationId) => {
    //ConversationModel.findOne({ _id : conversationId}).apendMessage

    /*MessageModel.findOne({ title: 'Casino Royale' }, function(error, story) {
        if (error) {
            return handleError(error);
    }
    story.author = author;
    console.log(story.author.name); // prints "Ian Fleming"*/
}

module.exports = ConversationCtrl