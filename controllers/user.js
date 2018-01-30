var UserModel = require('../models/user');
var user = function(){};

user.protitype.add_user(){
    UserModel.create({
        name : 'Ivan',
        mail : 'ivan@cuanti.com',
        tel : '123456',
        dir : ''
    });

    UserModel.create({
        name : 'Eliana',
        mail : 'eli@test.com',
        tel : '456789',
        dir : ''
    });
}


user.apply