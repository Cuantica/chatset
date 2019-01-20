const express = require('express');
const router = express.Router();
const sessionManager = require('./session-manager')
const path = require('path');

// Parse http requests with content-type multipart/form-data
const multiparty = require('multiparty'); 

const UserCtrl = require('./controllers/UserCtrl')

// Recupera la session e informacion de  usuario
router.use((req, res, next) => {
    UserCtrl.tokenValidation(req, res, next)
})


// Pagina de Inicio
router.get('/',(req, res) => {
    const { userId, token } = req.session

    if (userId && token){
        res.redirect('/index')
    }
    else {
        res.redirect('/login')
    }

})


// Pagina de aplicacion / box del chat
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