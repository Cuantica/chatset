var ConversationCtrl = new require('./controllers/ConversationCtrl');
var MessageCtrl =  new require('./controllers/MessageCtrl');
var UserCtrl = new require('./controllers/UserCtrl');


var app = require('./app'); 
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var io = require('socket.io')();

module.exports = {
    conversationCtrl : new ConversationCtrl(io),
    messageCtrl : new MessageCtrl ,
    userCtrl : new UserCtrl(io)
};