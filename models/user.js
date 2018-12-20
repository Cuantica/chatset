var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_scheme = Schema({
    user_name : 'String',
    user_mail : 'String',
    user_phone : 'String',
    user_dir : 'String',
    _created_up : Date,
    _update_up : Date
});

module.exports = mongoose.model('Users', user_scheme);