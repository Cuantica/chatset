var mongoose = require('mongoose');
var message_scheme = mongoose.Schema({
    from : "ObjectId", 
    to : ["ObjectId"],
    date : "Date",
    content : "String"
});

module.exports = mongoose.model('Message', message_scheme);

