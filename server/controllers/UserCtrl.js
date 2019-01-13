const UserModel = require('../models/User');
const express = require('express');
const http = require('http').createServer(express());
const socketIO = require('socket.io')(http);

//var SessionModel = require('../models/session');
const ConversationModel = require('../models/Conversation');

class UserCtrl{ constructor(){} }

/**
 * Se crea un usuario, por defecto sin conversaciones
 */
UserCtrl.prototype.newUser = function(userParam, typeParam, isAdmin){
    
    UserModel.create({
        name : userParam.name,
        mail : userParam.mail,
        phone : userParam.phone,
        username : userParam.username,
        profile_image : userParam.profile_image,
        password : userParam.password,
        token : userParam.token
    }).then(user => {
        console.log(user);
        console.log('Se creo el usuario')    
        socketIO.emit('user created')
        
    }).catch(err => {
        console.log('Error: ', err);
    })
}


// Listado de todos los usuarios
UserCtrl.prototype.listAll = function(){
    let _io = this._io;

    const query = UserModel.find({}, 
        { user_name : 1 }, 
        { sort : { _created_up : 1 }},
        function(err, userList){
            userList.forEach(user => {

                console.log(user);
                //_io.emit('user-added',user);
            });
        }
    );
}

// Inicia session, verifica con la tabla y asigna 
UserCtrl.prototype.initSession = function(userData){
    let { user, password } = userData

    console.log(user)
    console.log(password)
}


// Cierra la session del usuario
UserCtrl.prototype.logout = (req, res) => {
    req.session.destroy(err => {
        if (err){
            res.redirect('/index')
        }
        
        res.clearCookie(SESS_NAME)
        res.redirect('/login')
    })
}



module.exports = UserCtrl;
