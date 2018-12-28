/**
 * Un mensaje, necesariamente debe pertener a una conversación, es por esto, que el
 * conversation es un ObjectId por ende requerido
 */

var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
    content : 'String',
    file_path : 'String', // Puede ser cualquier tipo documento
    file_format : 'String', // Formato del archivo
    conversation : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    from : { // Emisor
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }, 
    _created_at : {
        default : Date.now()
    },
});

module.exports = mongoose.model('Message', MessageSchema);