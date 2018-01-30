var mongoose = require('mongoose');
var user_scheme = mongoose.Schema({
    name : 'String',
    mail : 'String',
    tel : 'String',
    dir : 'String'
});

module.exports = mongoose.model('Users', user_scheme);