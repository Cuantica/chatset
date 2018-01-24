var ConversationModel = require('../models/conversation');

// crea una nueva conversacion
var conversation = function(){
    this.mensaje = new ConversationModel();
}

// agrega una nueva conversation
conversation.prototype.create = function(conversation){
    console.log();
}

// agrega una nueva conversation
conversation.prototype.list = function(){
    console.log(this.mensaje);
}

module.exports = conversation;



