/**
 * Un mensaje, necesariamente debe pertener a una conversación, es por esto, que el
 * conversation es un ObjectId por ende requerido
 * 
 *      La propiedad message_type, Representa las acciones/eventos que pueden presentarse en una conversacion
 */

var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
    content : 'String',
    file_path : 'String', // Puede ser cualquier tipo documento
    file_format : 'String', // Formato del archivo
    message_type : 'String',  
    conversation : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
    },
    from : { // Emisor
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }, 
    _created_at : {
        type : Date,
        default : Date.now()
    }
});



module.exports = mongoose.model('Message', MessageSchema);