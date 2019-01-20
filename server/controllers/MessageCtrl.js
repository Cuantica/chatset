const mongoose = require('mongoose')

// -- Modelos --
var MessageModel = require('../models/Message')
var ConversationModel = require('../models/Conversation')
var UserModel = require('../models/User')

class MessageCtrl {
    constructor(){}


    /**
     * Agrega un nuevo mensaje
     * Verificar si la conversacion le pertenece al usuario
     * @param {MessageSchema} messageParam 
     */
    static newMessage(userId, messageParam){
        let userObjectId = mongoose.Types.ObjectId(userId);
        let convObjectId = mongoose.Types.ObjectId(messageParam.conversation)  

        console.log('Contenido de prueba') 

        ConversationModel.find({
            "_id": convObjectId , "members" : userObjectId 
        }, (err, res) => {

            if(res.length > 0){
                MessageModel.create({
                    content : messageParam.content,
                    file_path : messageParam.file_format, 
                    file_format : messageParam.file_format, 
                    message_type : '',  
                    conversation : convObjectId,
                    from : userId
                }).then(userObjectId => {
                    console.log("Se inserto el mensaje");
                })              
            }
        });
            
   
    }


    /**
     * Listado de mensajes por conversacion, para un usuario en especifico
     * @param conversationId
     * @param userId
     * 
     * @return Promise<messages>
     */
    static listMessageByConversation(conversationId, userId){
        let promise = MessageModel.find({
            "conversation" : mongoose.Types.ObjectId(conversationId),
        }).sort({'_created_at' : -1 }).exec()
        
        return promise
    }

    /**
     * Listado de mensajes por conversacion, para un usuario en especifico
     * @param conversationId
     * @param userId
     * 
     * @return Promise<messages>
     */
    static listMessageByConversation(conversationId, userId){
        let promise = MessageModel.find({
            "conversation" : mongoose.Types.ObjectId(conversationId),
        }).sort({'_created_at' : -1 }).exec()
        
        return promise
    }


    /**
     * Listado de todos mensajes
     * @return Promise<messages>
     */
    static listAllMessage(){
        let promise = MessageModel.find().sort({'_created_at' : -1 }).exec()
        return promise
    }

}

module.exports = MessageCtrl