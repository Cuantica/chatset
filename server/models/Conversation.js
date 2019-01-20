/**
 * Una conversación puede contener a 2 usuarios - Usuario a Usuario
 * o a un grupo, para esto el campo type_conversation, determina el tipo
 * 
 *      Grupo: 
 *       - Se crea un mensaje por defecto, al crear la conversacion
 *       - Se debe crear un titulo, en caso que la conversacion sea grupal
 */

const mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
    members : [ { 
       type: mongoose.Schema.Types.ObjectId , 
       ref : 'User'
    }],
    messages : [ mongoose.Schema.Types.Mixed ],
    conversation_image : 'String',
    type_conversation : {
        type : 'String',
        enum: ['user', 'group'],
        lowercase : true,
        default : 'user'
    }, 
    title_conversation : {
        type : 'String',
        default : null
    }, 
    _created_at : {
        type : Date,
        default : Date.now()
    },
    _updated_at : Date, // Contiene cualquier información de actualización, desde nuevo miembro, hasta nuevo mensaje
})

// Agrega un mensaje a una conversacion
ConversationSchema.method.addMessage = (messageId) => {
    this.messages.push(mongoose.Types.ObjectId(messageId))
};

// Agrega un miembro al grupo
ConversationSchema.method.addMember = (userId) => {
    this.members.push(mongoose.Types.ObjectId(userId))
};


module.exports = mongoose.model('Conversation', ConversationSchema)