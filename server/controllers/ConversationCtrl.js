const mongoose = require('mongoose');

// Modelos
const ConversationModel = require('../models/Conversation');
const MessageModel = require('../models/Message');


class ConversationCtrl {
    

    /** 
     * Puede agrega una conversacion del tipo grupo si es administrador 
     * del sistema
     * 
     * 
     * 
     * @param {ConversationSchema} conversationParam 
     * @param {String} userRole - Role de usuario [admin o user]
     */
    static newConversation(conversationParam, userRole){
        let listMembersObjectId = []; // Listado de objects ID, de miembros

        try {

            if (userRole == 'admin'){
                let listMembersId = conversationParam.members;
                if (listMembersId.lenght <= 1){
                    throw("Conversacion debe tener más de dos integrantes");
                }

                listMembersId.forEach(userId => {
                    listMembersObjectId.
                        push(mongoose.Types.ObjectId(userId)
                    );
                });


                ConversationModel.create({
                    members : listMembersObjectId,
                    messages : [],
                    type_conversation : conversationParam.type_conversation,
                    title_conversation : conversationParam.title_conversation,
                    _update_up : Date.now()
                })

                return true
            }
            else {
                return false;
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
     * Listado de conversationces por usuario
     * @param {String} userId 
     * @return Promise<boolean>
     */
    static listAllConversation(){
        return ConversationModel.find().exec()
    }
    


    /**
     * Lista todas las conversaciones
     * @return Promise<conversation>
     */
    static listAllConversation(){
        let promise = ConversationModel.find({}).exec()
        return promise;
    }

    /**
     * Retorna si la conversacion pertenece al usuario
     * @param {String} userId 
     * @return Promise<boolean>
     */
    static userHasThisConversation(userId){
        // pass
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