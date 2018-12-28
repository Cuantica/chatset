/**
 * Una conversación puede contener a 2 usuarios - Usuario a Usuario
 * o a un grupo, para esto el campo type_conversation, determina el tipo
 * 
 *      Grupo: 
 *       - Se crea un mensaje por defecto, al crear la conversacion
 *       - Se debe crear un titulo, en caso que la conversacion sea grupal
 */

var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
    members : [ { 
       type: mongoose.Schema.Types.ObjectId , 
       ref : 'User'
    }],
    messages : [ mongoose.Schema.Types.Mixed ],
    type_conversation : {  // User or Group
        type : 'String',  
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
    _update_at : Date, // Contiene cualquier información de actualización, desde nuevo miembro, hasta nuevo mensaje
});


/*conversation_schema.methods.verificar_mensajes = function(){
    var test = this.mensajes ?
        "Mi mensaje "+this.mensajes :
        "No se encuentra mensaje"

    console.log(test);
}*/

ConversationSchema.methods.addMessage = function(message){
    this.messages.push(message);
}


// Return the all users of conversation
ConversationSchema.method.getAllUser = function(conversationId){
    
}


module.exports = mongoose.model('Conversation', ConversationSchema);