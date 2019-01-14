const UserModel = require('../models/User')
const express = require('express')
const http = require('http').createServer(express())
const socketIO = require('socket.io')(http)

//var SessionModel = require('../models/session')
const ConversationModel = require('../models/Conversation')

class UserCtrl{ 
    constructor(){} 

    /**
     * Se crea un usuario, por defecto sin conversaciones
     * @param { UserSchema } userParam 
     * @param { String } typeParam 
     * @param { boolean } isAdmin 
     */
    newUser(userParam, typeParam, isAdmin){
        UserModel.create({
            name : userParam.name,
            mail : userParam.mail,
            phone : userParam.phone,
            username : userParam.username,
            profile_image : userParam.profile_image,
            password : userParam.password,
            token : userParam.token
        }).then(user => {
            console.log(user)
            console.log('Se creo el usuario')    
            socketIO.emit('user created')
            
        }).catch(err => {
            console.log('Error: ', err)
        })
    }

    listAll(){
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
     * 
     * @param {String} u  : usuario
     * @param {String} p : password 
     */
    loginValidation(u, p){
        let promise = UserModel.findOne({ username : u,  password  :p}).exec()
        return promise
    }

}


module.exports = UserCtrl
