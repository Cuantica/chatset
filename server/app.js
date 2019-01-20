const express = require('express')
const app = express()
const http = require('http').createServer(app)
const fs = require('fs')
const sessionManager = require('./session-manager')
const path = require('path')
const clear = require('clear')
const db = require('./db')

app.use(express.json()) // to support JSON-encoded bodies
app.use(express.urlencoded()) // to support URL-encoded bodies
app.use(express.static(path.join(__dirname, '/../public')))
app.use(sessionManager.sessionLogin)
app.set('view engine', 'pug');


// Routers
const webRouters = require('./web-routes')
const apiRouters = require('./api-routes')

app.use('/', webRouters)
app.use('/api/v1', apiRouters)
app.use((req, res, next) => {
  res.status(404).send('Error 404, Contenido no encontrado')
})


http.listen(3001, () => {
    console.log('Server ready ;)')
})

/**
 * @link https://socket.io/docs/server-api
 */
const io = require('socket.io')(http, { path : '/sockets' })
const sharedsession = require("express-socket.io-session");

// -- Controladores --
const ConversationCtrl = require('./controllers/ConversationCtrl')
const UserCtrl = require('./controllers/UserCtrl')
const MessageCtrl = require('./controllers/MessageCtrl')

io.use(sharedsession(sessionManager.sessionLogin));

var count = 0
io.on('connection', function(socket){
    // Operaciones por defecto
    let userData = getUserSession(socket)
    listAllConversation(socket)
    

    socket.on('conversation create', function(conversationParam){
        let userRole = sessUser.role
        /*ConversationCtrl.newConversationGroup(conversationParam, userRole )
        .then(res => {
            console.log(res);
            socket.io
        },err => {
            console.log(err)
        })*/
        console.log(userRole)
    })


    /**
     * Abre una conversacion con el contenido de los mensajes
     * @param conversationId
     */
    socket.on('conversation open', function(conversationId){
        MessageCtrl.listMessageByConversation(conversationId, null).then(res => {
            socket.emit('message list', res)
        },err => {
            console.log(err)
        })
    })


    /**
     * @param {MessageSchema} message
     */
    socket.on('new message', function(message){
        let user = getUserSession(socket)
        
        MessageCtrl.newMessage(user._id, message)

        socket.broadcast.emit('new message', {
            username: userData.username,
            content : message.content,
            conversation : message.conversation
        })
        
    })


    // when the client emits 'typing', we broadcast it to others
    /*socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        })
    })*/

    // when the client emits 'stop typing', we broadcast it to others
    /*socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        })
    })*/    

    socket.on('disconnect', function(){
        console.log('Usuario desconectado')
    })
})


function listAllConversation(socket){
    let userId = getUserSession(socket)._id
    
    ConversationCtrl.listConversationByUser(userId).then(res => {
        socket.emit('conversation list', res)
    }, err => {
        console.log(err)
    })
}

function getUserSession(socket){
    let user = sessionManager.verifyIsSessionActive(socket.handshake.session.user)

    socket.emit('userInfo')

}