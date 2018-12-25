var mongoose = require('mongoose');
//var Scheme = mongoose.Schema;

var MessageSchema = mongoose.Schema({
    content : 'String',
    file_path : 'String', // Puede ser cualquier documento
    conversation : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    from : { // Emisor
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }, 
    //to : 'String',  // Receptor
    _created_at : Date
});

module.exports = mongoose.model('Message', MessageSchema);