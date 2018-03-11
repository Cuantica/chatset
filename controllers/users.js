var UserModel = require('../models/user');

function UserCtrl(io){
    this._io = io;
    this._current_user
};

// creating the new user and new conversation 
UserCtrl.prototype.newUser = function(userData, convCtrl){
    userData['_created_up'] = new Date();
    userData['_update_up'] = new Date();
    UserModel.create(userData).then(data => {
        convCtrl.newConversation([
            '5aa494b2b8ad74efaec51bd5',
            data._id
        ])
        this._io.emit('user-added',data);
        console.log(data._id);
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
                _io.emit('user-added',user);
            });
        }
    );
}

module.exports = UserCtrl;
