var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var message_scheme = Scheme({
    user_id : Scheme.Types.ObjectId,  // from
    user_name : 'String',  // from
    _created_up : Date,
    content : 'String',
    conv_id : Scheme.Types.ObjectId,
});

module.exports = mongoose.model('Messages', message_scheme);

