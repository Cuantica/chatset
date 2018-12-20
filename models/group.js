var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var group_schema = Schema({
   conv_members : [ { type: Schema.Types.ObjectId , ref : 'Users'} ],
   _created_up : Date,
   _update_up : Date
});


/*conversation_schema.methods.verificar_mensajes = function(){
    var test = this.mensajes ?
        "Mi mensaje "+this.mensajes :
        "No se encuentra mensaje"

    console.log(test);
}*/

module.exports = mongoose.model('Group', group_schema);