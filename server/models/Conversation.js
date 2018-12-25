var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConversationSchema = new mongoose.Schema({
    members : [ { 
       type: mongoose.Schema.Types.ObjectId , 
       ref : 'User'} 
    ],
    messages : [ { 
       type: mongoose.Schema.Types.ObjectId , 
       ref : 'Message'} 
    ],
    type : 'String', // User or Group
    _created_up : Date,
    _update_up : Date
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