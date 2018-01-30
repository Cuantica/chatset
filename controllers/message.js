var MessageModel = require('../models/message');

var message = function(){};

// Adding a new Message
message.prototype.add_message = function(message){
    MessageModel.create({
        from : "", 
        to : "Eliana",
        date : new Date(),
        content : message
    });
}

module.exports = message;