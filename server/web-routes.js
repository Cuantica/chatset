const express = require('express');
const router = express.Router();
const sessionManager = require('./session-manager')
const path = require('path');
const multiparty = require('multiparty'); // Parse http requests with content-type multipart/form-data

const users = require('./mocks/users')
const UserCtrl = require('./controllers/UserCtrl')

// Middleware para verificar acceso 
router.use(function timeLog(req, res, next) {
  console.log(`Method: ${req.method} - Path: ${req.path} - Time:  ${Date.now()}`);
  next();
});

// Recupera la session e informacion de  usuario
router.use((req, res, next) => {
    const { userID } = req.session 
    if (userID){
        res.locals.user = 
        UserCtrl.loginValidation()
        users.find((user) => 
            user.id === req.session.userID
        )
    }
    next()
})

/**
 * Pagina de Inicio
 */
router.get('/',(req, res) => {
    const { userID } = req.session
    
    if (userID){
        res.redirect('/index')
    }
    else {
        res.redirect('/login')
    }
})



router.get('/index', sessionManager.redirectLogin,  (req, res) => {
    const { user } = res.locals
    res.sendFile(path.resolve('public/app.html'))
})


// Formulario de Login
router.get('/login', sessionManager.redirectIndex ,(req, res) => {
    res.sendFile(path.resolve('public/login.html'))
})


// Formulario de Registro (Inactivo para el caso)
/*app.get('/register', sessionManager.redirectIndex , (req, res) => {
    res.sendFile(path.resolve('public/register.html'))
})*/


/**
 * Valida formulario de inicio de session
 */
router.post('/login', sessionManager.redirectIndex, (req, res) => {
    const { username, password } = req.body;
    UserCtrl.loginValidation(username, password, req, res)
    
    /*if (username && password){
        
        

        const user = users.find( (user) => { // TODO hash

            if (user.username === username 
                && user.password === password) {
                return user
            }

            return false
        })

        if (user){
            req.session.userID = user.id
            return res.redirect('/index')
        }
    }
    
    */
    
})


/**
 * Cierra la session, y redireccion a login
 */
router.post('/logout', sessionManager.redirectLogin,  (req,res) => {

    req.session.destroy(err => {
        if (err){
            res.redirect('/index')
        }
        
        res.clearCookie('sid')
        res.redirect('/login')
    })
})

module.exports = router;