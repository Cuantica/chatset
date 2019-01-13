const express = require('express')
const router = express.Router()
const sessionManager = require('./session-manager')


//router.use()

/**
 * Muestra version del webservice 
 * @since 0.1.0 mostrala informacion de la session
 */
router.get('/', function(req, res){

    fs.readFile( `${__dirname}/../package.json`, (err, data) => {
        if (err){
            console.log("error ", err);
            return;
        }
        else {
            let packageInfo = JSON.parse(data);
            res.json({
                "msg" : packageInfo.name,
                "version" : packageInfo.version
            });
        }
    });

});



/**
 * Permite crear nuevos usuarios, mediante un formulario de registro
 */
route.post('/register', redirectindex, (req, res) => {
    const { name , username, password } = req.body;

    if (name && username && password){ // todo: valifdation     
        const exists = users.some((user) => {
            user.username === username
        })

        if (!exists){
            const user = {
                id : users.length + 1,
                name, 
                username, 
                password
            }
            
            users.push(user)

            req.session.userId = user.id
            res.redirect('/index')
        }
    }
    res.redirect('/register') // todo: view errors
})


/**
 * Permite crear un formulario
 */
router.post('/users', function(req, res){
    let userCtrl = new UserCtrl();
    userCtrl.newUser(req.body);

    return res.json("Se inserto correctamente");
});


/**
 * Crea una nueva conversation
 */
router.post('/conversations', function(req, res){
    let conversationCtrl = new ConversationCtrl();
    conversationCtrl.newConversation(req.body);
    
    res.json(req.body);
});

/** 
 * Asigna una conversacion a un mensaje
 */
router.post('/messages', function(req, res){
    let messageCtrl = new MessageCtrl(null, app);
    messageCtrl.newMessage(req.body);

    res.json(req.body);
});


module.exports = router