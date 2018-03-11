var UserModel = require('../models/user');

function UserController(io){
    this._io = io;
};

// creating the new user
UserController.prototype.newUser = function(userData){
    userData['_created_up'] = new Date();
    userData['_update_up'] = new Date();
    UserModel.create(userData).then(data => {
        this._io.emit('user-added',data);
    });
}

// List the all users conversation
UserController.prototype.listAll = function(){
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

module.exports = UserController;
