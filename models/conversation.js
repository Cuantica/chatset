var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cschema = Schema({
    members : [ { type: Schema.Types.ObjectId , ref : 'Users'} ]
});

/*conversation_schema.methods.verificar_mensajes = function(){
    var test = this.mensajes ?
        "Mi mensaje "+this.mensajes :
        "No se encuentra mensaje"

    console.log(test);
}*/

module.exports = mongoose.model('Conversations', cschema);