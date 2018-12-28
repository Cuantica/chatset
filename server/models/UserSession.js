/**
 * Una session representa el acceso del usuario a los 
 * recursos de la base de datos
 */
var mongoose = require('mongoose');

var UserSessionSchema  = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ' User'
    },
    time_duration : mongoose.Schema.Types.Mixed,
    _created_up : {
        type : Date,
        default : Date.now()
    }
});


module.exports = mongoose.model('Session', UserSessionSchema);