const UserModel = require('../models/User')
const express = require('express')
const http = require('http').createServer(express())
const socketIO = require('socket.io')(http)

//var SessionModel = require('../models/session')
const ConversationModel = require('../models/Conversation')

class UserCtrl{ 
    
    /**
     * Se crea un usuario, por defecto sin conversaciones
     * @param {UserSchema} userParam 
     * @param {Response} res 
     */
    static newUser(userParam, res){
        UserModel.create({
            name : userParam.name,
            mail : userParam.mail,
            phone : userParam.phone,
            username : userParam.username,
            profile_image : userParam.profile_image,
            password : userParam.password,
            token : userParam.token
        }).then(user => {
            return res.json({
                "code" : res.statusCode,
                "msg" : "Se creo corretamente el usuario",
                "data" : req.body
            })
            console.log('se creo el usuario');
            
        }).catch(err => {
            return res.status(500).json({
                "code" : res.statusCode,
                "msg" : err.errmsg
            })
        })
    }

    static listAll(){
        const query = UserModel.find({}, 
            { user_name : 1 }, 
            { sort : { _created_up : 1 }},
            function(err, userList){
                userList.forEach(user => {

                    console.log(user)
                    //_io.emit('user-added',user)
                })
            }
        )
    }

    /**
     * @param {String} u  : usuario
     * @param {String} p : password 
     */
    static loginValidation(u, p, req, res){
       UserModel.findOne({ username : u,  password  :p}, (err, user) => {
            if (user != null){
                req.session.userID = user._id
                req.session.token = user.token
                return res.redirect('/index')
            }

            return res.redirect('/login')
       })
    }

    /**
     * Si token existe, crea/inicia la session de usuario
     * @param {String} t - token 
     */
    static loginWithToken(t){
        UserModel.findOne({ token : t}, (err, user) => {
            if (user != null){
                req.session.userID = user._id
                req.session.token = user.token
                return res.redirect('/index')
            }

            return res.redirect('/login')
       })
    }

    /**
     * Valida si existe un token para ese usuario
     * @param {*} token 
     * @param {*} next 
     */
    static tokenValidation(token, next){
        /*UserModel.findOne({ token : token }, (user) => {
            console.log()
        })*/
    }
}


module.exports = UserCtrl
