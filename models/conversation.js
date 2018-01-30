
var mongoose = require('mongoose');

var conversation_schema = mongoose.Schema({
    participants : ['ObjectId']
}, { autoIndex : false });

conversation_schema.methods.verificar_mensajes = function(){
    var test = this.mensajes ?
        "Mi mensaje "+this.mensajes :
        "No se encuentra mensaje"

    console.log(test);
}

module.exports = mongoose.model('Conversations', conversation_schema);