const mongoose = require('mongoose');

// Modelos
const ConversationModel = require('../models/Conversation');
const MessageModel = require('../models/Message');


class ConversationCtrl {
    
    static isAdmin(){
        //ConversationCtrl.isAdminBool = true;
        return true;
    }

    /** 
     * Puede agrega una conversacion del tipo grupo si es administrador 
     * del sistema
     * 
     * @param {ConversationSchema} conversationParam 
     * @param {String} userRole - Role de usuario [admin o user]
     */
    static newConversationGroup(conversationParam, userRole){
        listMembers = []; // Miembros de la conversacion

        try {

            if (userRole == 'admin'){
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
                }).exec();
            }
            else {
                console.log('test');
            }
            

        } catch (error) {
            console.log('Error: ', error)
        }    
    }


    /**
     * Listado de conversationces por usuario
     * @param {String} userId 
     * @return Promise<boolean>
     */
    static listConversationByUser(userId){
        let userObjectID = mongoose.Types.ObjectId(userId);
        
        let promise = ConversationModel.find({
            "members" : userObjectID
        }).exec()
        return promise
    }

    /**
     * Lista todas las conversaciones
     * @return Promise<conversation>
     */
    static listAllConversation(){
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