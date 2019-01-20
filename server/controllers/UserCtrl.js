const express = require('express')
const http = require('http').createServer(express())

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
            token : userParam.token,
            role : userParam.role
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


    // Listado de todos los usuarios
    static listAllUsers(userSession){
        UserModel.find({}).sort({ _created_up : -1 }).then(res => {
            users.forEach(user => {
                console.log(user)
            })

        }) 
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
                req.session.user = user
                return res.redirect('/index')
            }

            return res.redirect('/login')
       })
    }

    /**
     * Inicia session, con datos de usuario y contraseña, mediante 
     * API 
     * 
     * @since 0.1.X
     * 
     * @param {String} u - username 
     * @param {String} p - password
     * @param {HTTP Request} req 
     * @param {HTTP Response} res 
     * 
     */
    static loginValidationAPI(u, p, req, res, next){
        UserModel.findOne({ username : u,  password  :p}, (err, user) => {
            if (user != null){
                req.session.user = user
                
                /*return res.json({
                    "code" : res.statusCode,
                    "msg" : `${user.name} ha iniciado sesión`,
                    "token" : user.token,
                    "data" : req.session.user
                })      */
                next()
            }
            else {
                return res.status(404).json({
                    "code" : res.statusCode,
                    "msg" : `${u.toUpperCase()} verifiqué sus credenciales`
                })      
            }
       })
    }


    /**
     * Si token existe, crea/inicia la session de usuario
     * @param {String} token
     * @param {HTTP Request} req 
     * @param {HTTP Response} res 
     */
    static loginWithToken(token, req, res){
        UserModel.findOne({ token : token }, (err, user) => {
            if (user != null){
                req.session.user = user

                return res.redirect('/index')
            }

            return res.redirect('/login')
        })
    }

    /**
     * Valida y verifica el token, si existe con la session
     * e informacion del usuario, la recupera
     * 
     * @param {String} token
     * @param {HTTP Request} req 
     * @param {HTTP Response} res 
     * @param {Next Middleware} next 
     */
    static tokenValidation(req, res, next){          
        
        if (req.session.user){
            const { token } = req.session.user
            
            UserModel.findOne({ token : token }, (err, user) => {
                if (user != null){
                    res.locals.user = user
                }     

                next()
            })
        } else {
            next()
        }
    }

}


module.exports = UserCtrl
