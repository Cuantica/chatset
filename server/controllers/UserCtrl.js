var UserModel = require('../models/User');
var mongoose = require('mongoose');

//var SessionModel = require('../models/session');
var ConversationModel = require('../models/Conversation');

function UserCtrl(io = null){
    this._io = io;
};

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
        password : null,
        token : userParam.token
    }).then(user => {
        console.log('Se creo el usuario');    
        //this._io.emit('user-added',user);
        
    }).catch(err => {
        console.log('Error: ', err);
    });
}


// List the all users conversation
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

// Init Session with 
UserCtrl.prototype.initSession = function(user){
    
    // 
    //_io.emit('session start')
}



UserCtrl.prototype.logout = function() {

}



module.exports = UserCtrl;
