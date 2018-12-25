var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSessionSchema  = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ' User'
    },
    name : 'String',
    token : 'String',
    time_duration : 'Mixed',
    _created_up : 'String'
});


module.exports = mongoose.model('Session', UserSessionSchema);