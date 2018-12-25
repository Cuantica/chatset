var UserModel = require('../models/User');
//var SessionModel = require('../models/session');
var ConversationModel = require('../models/Conversation');

function UserCtrl(io){
    this._io = io;
};

// creating the new user
UserCtrl.prototype.newUser = function(userData){
    userData['_created_up'] = new Date();
    userData['_update_up'] = new Date();
    UserModel.create(userData).then(user => {
        this._io.emit('user-added',user);
        ConversationModel.create({
            conv_members : ['5aa585262759814dd9218875', user._id ],
            _created_up : userData['_created_up'],
            _update_up : userData['_update_up'],
        }).then(conversation => {
            this._io.emit('conversation-added',conversation._id);
        });
    });
}


// List the all users conversation
UserCtrl.prototype.listAll = function(){
    let _io = this._io;
    const query = UserModel.find({}, 
        { user_name : 1}, 
        { sort : { _created_up : 1 }},
        function(err, res){
            res.forEach(user => {
                console.log(user);
                _io.emit('user-added',user);
            });
        }
    );
}

// Init Session with 
UserCtrl.prototype.initSession = function(user){
    
    // 
    //_io.emit('session start')
}

// Init Session Value
UserCtrl.prototype.getInitSession = function(){
    

    return true;
}


UserCtrl.prototype.logout = function() {

}



module.exports = UserCtrl;
