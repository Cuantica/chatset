const session = require('express-session')

const {
    PORT = 3003,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    //SESS_LIFETIME = CINCO_MIMUTOS,
    SESS_SECRET = 'ssh!quiet,it\'asecret!',
} = process.env

//const CINCO_MIMUTOS = 1000 * 60 * 60 * 60 *5

module.exports = {

    // Configuraciones de la session de usuario
    sessionLogin : session({
        name : 'sid',
        resave : false,
        saveUninitialized : false,
        secret : 'ssh!quiet,it\'asecret!',
        cookie : {
            //maxAge : CINCO_MIMUTOS, 
            sameSite: true,
            secure : false
            //secure : this.NODE_ENV === 'production',
        }
    }),

    // Si la sesssion existe, redirecciona al index
    // Solo implementar, para el propio login, y el logout
    redirectIndex : (req, res, next) => {
        if (req.session.userID){
            res.redirect('/index')
        } else {
            next()
        }
    },

    // Si la sesssion existe, redirecciona al index del API
    // Solo implementar, para el propio login, y el logout
    redirectAPIIndex : (req, res, next) => {
        if (req.session.userID){
            res.redirect('api/v1/')
        } else {
            next()
        }
    },

    // Si no inicio session, redirecciona al login
    redirectLogin : (req, res, next) => {
        if (!req.session.userID){
            res.redirect('/login')
        } else {
            next()
        }
    }
}