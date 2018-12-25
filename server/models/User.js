var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name : 'String',
    mail : 'String',
    phone : 'String',
    username : 'String',
    profile_image : 'String',
    password : 'String',
    token : 'String',
    conversations : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Conversation'
    },
    _created_at : Date,
    _update_at : Date
});

UserSchema.methods.getUser = function(_id){
    User.find({'id' : _id}).then(user => {
        return user
    });
}

UserSchema.methods.getConversation = function(){
    // Retorna el listado de conversaciones de un usuario
}


module.exports = mongoose.model('User', UserSchema);