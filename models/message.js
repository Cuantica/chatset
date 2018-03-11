var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var message_scheme = Scheme({
    from : mongoose.Types.ObjectId, 
    to : mongoose.Types.ObjectId,
    date : Date,
    content : 'String',
    conv_id : mongoose.Types.ObjectId,
});

module.exports = mongoose.model('Message', message_scheme);

