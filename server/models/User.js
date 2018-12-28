var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name : 'String',
    mail : 'String',
    phone : 'String',
    username : {
        type : 'String',
        lowercase : true,
        unique : true
    },
    profile_image : 'String',
    password : 'String',
    token : { 
        type : 'String',
        unique : true
    },
    conversations : [ mongoose.Schema.Types.Mixed ],
    role : 'String', // Rol del usuario, por el momento solo 'user' or 'admin'
    _created_at : {
        type : Date,
        default : Date.now()
    },
    _update_at : Date,
});

UserSchema.methods.getUser = function(userId){
    User.find({ '_id' : userId }).then(user => {
        return user
    });
}

UserSchema.methods.getConversation = function(){
    // Retorna el listado de conversaciones de un usuario
}


module.exports = mongoose.model('User', UserSchema);