const mongoose = require('mongoose');

// Modelos
const ConversationModel = require('../models/Conversation');
const MessageModel = require('../models/Message');


class ConversationCtrl {
    constructor(){}

    /** 
     * Agrega un mensaje a una conversacion
     * @param conversationParam - Recibe los datos de la conversation
     */
    newConversation(conversationParam){
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
    }


    listConversationByUser(userId){
        let userObjectID = mongoose.Types.ObjectId(userId);
        ConversationModel.find({"members" : userObjectID}, (err, res) => {
            console.log(res)
        }) 
    }

    /**
     * Lista todas las conversaciones
     * @return Promise<conversation>
     */
    listAllConversation(){
        let promise = ConversationModel.find({}).exec()
        return promise;
    }
}




//ConversationCtrl.prototype.appendMessageToConversation = (conversationId) => {
    //ConversationModel.findOne({ _id : conversationId}).apendMessage

    /*MessageModel.findOne({ title: 'Casino Royale' }, function(error, story) {
        if (error) {
            return handleError(error);
    }
    story.author = author;
    console.log(story.author.name); // prints "Ian Fleming"*/
//}

module.exports = ConversationCtrl