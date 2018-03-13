var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var session_scheme  = new Schema({
    session_name : 'String',
    session_val : 'Mixed',
    _created_up : 'String',
    _update_up : 'String'
});


module.exports = mongoose.model('Session', session_scheme);