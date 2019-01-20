const express = require('express')
const router = express.Router()
const sessionManager = require('./session-manager')
const fs = require('fs')

const UserCtrl = require('./controllers/UserCtrl')
const ConversationCtrl = require('./controllers/ConversationCtrl')
const MessageCtrl = require('./controllers/MessageCtrl')


// Muestra version del webservice 
router.get('/', function(req, res){
    fs.readFile( `${__dirname}/../package.json`, (err, data) => {
        
        if (err){
            console.log("error ", err);
            return;
        }
        else {
            let packageInfo = JSON.parse(data);
            res.json({
                "name" : packageInfo.name,
                "version" : packageInfo.version,
                "description" : packageInfo.description,
                "author" : packageInfo.author
            });
        }
    });

});


router.post('/conversations', function(req, res){
    ConversationCtrl.newConversation(req.body, 'admin')
    console.log('Se crea CONVERSACION desde API')

    res.send('Se crea CONVERSACION desde API')
});

router.get('/conversations', function(req, res){
    ConversationCtrl.listAllConversation().then(conversations => {
        if (conversations.length > 0){
            res.send(conversations)
        }
        else {
            res.send({
                "msg" : "No se encontraron conversaciones"
            })
        }
        
    })
});


router.post('/messages', function(req, res){
    MessageCtrl.newMessage(req.body);
});


router.get('/messages', function(req, res){
    MessageCtrl.listMessageByConversation().then(messages => {
        if (messages.length > 0){
            res.send(messages)
        }
        else {
            res.send({
                "msg" : "No se encontraron mensajes"
            })
        }
        
    })
});

// Crea usuarios
router.post('/users', function(req, res){
    UserCtrl.newUser(req.body, res)

    console.log('Se crea USUARIO desde API')
})


router.get('/users/:userId/messages', function(req, res){
    MessageCtrl.listMessageByConversation().then(messages => {
        if (messages.length > 0){
            res.send(messages)
        }
        else {
            res.send({
                "msg" : "No se encontraron mensajes"
            })
        }
        
    })
});

module.exports = router