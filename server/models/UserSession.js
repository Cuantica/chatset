var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSessionSchema  = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ' User'
    },
    time_duration : mongoose.Schema.Types.Mixed,
    _created_up : {
        type : Date,

    }
});


module.exports = mongoose.model('Session', UserSessionSchema);