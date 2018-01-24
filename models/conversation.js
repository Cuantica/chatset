var mongoose = require('mongoose');

var conversation_schema = mongoose.Schema({
    user_data : {
        name : String,
        lastname : String
    },
    mensajes: String
});

conversation_schema.methods.verificar_mensajes = function(){
    var test = this.mensajes ?
        "Mi mensaje "+this.mensajes :
        "No se encuentra mensaje"

    console.log(test);
}

module.exports = mongoose.model('ConversationModel', conversation_schema);