const express = require('express')
const http = require('http').createServer(express())
const socketIO = require('socket.io')(http)

const ConversationModel = require('../models/Conversation')
const UserModel = require('../models/User')

class UserCtrl{ 
    
    /**
     * Se crea un usuario, por defecto sin conversaciones
     * @param {UserSchema} userParam 
     * @param {HTTP Response} res 
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
                "data" : user
            })            

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
     * Inicia session, con datos de usuario y contraseña
     * @param {String} u - username 
     * @param {String} p - password
     * @param {HTTP Request} req 
     * @param {HTTP Response} res 
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
     * @param {String} token
     * @param {HTTP Request} req 
     * @param {HTTP Response} res 
     */
    static loginWithToken(token, req, res){
        UserModel.findOne({ token : token}, (err, user) => {
            if (user != null){
                req.session.userID = user._id
                req.session.token = user.token

                return res.redirect('/index')
            }

            return res.redirect('/login')
        })
    }

    /**
     * Valida y verifica si el token existe y recupera la session 
     * e informacion del usuario
     * 
     * @param {String} token
     * @param {HTTP Request} req 
     * @param {HTTP Response} res 
     * @param {Next Middleware} next 
     */
    static tokenValidation(token, req, res, next){
        
        if (token){    
            UserModel.findOne({ token : token }, (err, user) => {
                if (user != null){
                    res.locals.user = user
                }
                
                next()
            })
        }

        next()
    }
}


module.exports = UserCtrl
