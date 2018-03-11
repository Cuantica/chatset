var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var message_scheme = Scheme({
    from : "ObjectId", 
    to : "ObjectId",
    date : "Date",
    content : "String"
});

module.exports = mongoose.model('Message', message_scheme);

