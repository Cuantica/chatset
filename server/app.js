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


http.listen(3000, () => {
    console.log('Server ready ;)')
})

/**
 * @link https://socket.io/docs/server-api/#Socket
 */
const io = require('socket.io')(http, { path : '/sockets' })
const sharedsession = require("express-socket.io-session");

io.use(sharedsession(sessionManager.sessionLogin));

io.on('connection', function(socket){
    let sessUser = sessionManager.verifyIsSessionActive(socket.handshake.session.user)
    
    // -- Controladores --
    const ConversationCtrl = require('./controllers/ConversationCtrl')
    const UserCtrl = require('./controllers/UserCtrl')
    const MessageCtrl = require('./controllers/MessageCtrl')


    /**
     * Muestra las conversationces del usuario del usuario que 
     * inicio session
     */
    socket.on('conversation list', () => {
        let userId = sessUser._id
        ConversationCtrl.listConversationByUser(userId).then(conversations => {
            socket.emit('conversation list', conversations)
        }, err => {
            console.log(err)
        })
    })
    

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
     * Abre una conversacion
     * @param conversationId
     */
    socket.on('conversation open', function(conversationId){
        messageCtrl.listMessageByConversation(conversationId, null).then(res => {
            socket.emit('message list', res)
        },err => {
            console.log(err)
        })
    })


    /**
     * @param {Any} data - Contenido del mensaje
     */
    socket.on('message add', function(data){
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        })
    })

    

    socket.on('user register', function(msgComponent){
        msgController.newMessage(msgComponent)
    })


    socket.on('user unregister', function(msgComponent){
        console.log('unregister')
    })

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        })
    })

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        })
    })

    socket.on('disconnect', function(){
        console.log('Usuario desconectado')
    })
})



