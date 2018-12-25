var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = Schema({
    members : [ { 
       type: mongoose.Schema.Types.ObjectId , 
       ref : 'User'
    } ],
    _created_up : Date,
    _update_up : Date
});


/*conversation_schema.methods.verificar_mensajes = function(){
    var test = this.mensajes ?
        "Mi mensaje "+this.mensajes :
        "No se encuentra mensaje"

    console.log(test);
}*/

module.exports = mongoose.model('Group', GroupSchema);