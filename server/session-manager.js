const session = require('express-session')

const {
    PORT = 3003,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    //SESS_LIFETIME = CINCO_MIMUTOS,
    SESS_SECRET = 'ssh!quiet,it\'asecret!',
} = process.env

//const TIME_SESSION_SID = 1000 * 60 * 60 * 60 *5

module.exports = {

    // Configuraciones de la session de usuario
    sessionLogin : session({
        name : 'sid',
        resave : false,
        saveUninitialized : false,
        secret : 'ssh!quiet,it\'asecret!',
        cookie : {
            sameSite: true,
            secure : false
        }
    }),


    // Si la sesssion existe, redirecciona al index
    redirectIndex : (req, res, next) => {
        if (req.session.user){
            res.redirect('/index')
        } 

        next()
    },


    // Si no inicio session, redirecciona al login
    redirectLogin : (req, res, next) => {
        if (!req.session.user){
            res.redirect('/login')
        } else {
            next()
        }
    },

    // Verifica si existe la session, en dicho caso returna la misma, caso contrario falso, (Cualquier session)
    verifyIsSessionActive : (sessionParam) => {
        if (sessionParam)
            return sessionParam;
        return false
    }
    
}