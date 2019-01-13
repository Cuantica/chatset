const mongoose = require('mongoose')

// -- Modelos --
var MessageModel = require('../models/Message')
var ConversationModel = require('../models/Conversation')
var UserModel = require('../models/User')

function MessageCtrl(){}

// Adding a new Message
MessageCtrl.prototype.newMessage = function(messageParam){
    // Verificar si la conversacion le pertenece al usuario
    
    try {
        userId = mongoose.Types.ObjectId(messageParam.from);
        conversationId = mongoose.Types.ObjectId(messageParam.conversation)   

        ConversationModel.find({"_id": conversationId , "members" : userId }, (err, res) => {
            if(res.length > 0){
                MessageModel.create({
                    content : messageParam.content,
                    file_path : messageParam.file_format, 
                    file_format : messageParam.file_format, // Formato del archivo
                    message_type : '',  
                    conversation : conversationId,
                    from : userId
                }).then(message => {
                    console.log("Se inserto el mensaje");
                })              
            }
        });

    } catch (error) {
        console.log('Verificar ID de usuario y conversacion')
    }

    
}

/**
 * Listado de mensajes por conversacion
 * @param conversationId
 * @param userId
 * 
 * @return Promise<messages>
 */
MessageCtrl.prototype.listMessageByConversation = function(conversationId, userId){
    let promise = MessageModel.find({
        "conversation" : mongoose.Types.ObjectId(conversationId),
    })
    
    return promise
}

module.exports = MessageCtrl