const express = require('express');
const router = express.Router();
const sessionManager = require('./session-manager')
const path = require('path');
const multiparty = require('multiparty'); // Parse http requests with content-type multipart/form-data

const users = require('./mocks/users')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// Recupera la session de usuario
router.use((req, res, next) => {
    const { userID } = req.session 
    if (userID){
        res.locals.user = users.find((user) => 
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
    console.log(userID)

    if (userID){
        res.send(`
            <a href="/index">index</a>
            <form method="post" action="/logout">
                <button type="submit">Salir</button>
            </form>
        `)
    }
    else {
        res.send(`
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        `)
    }
})



router.get('/index', sessionManager.redirectLogin,  (req, res) => {
    const { user } = res.locals
    console.log(user)
    res.sendFile(path.resolve('public/app.html'))
    
    /*res.send(`
        <h1>index</h1>
        <ul>
            <li>Nombre: ${ user.name } </li>
            <li>username : ${ user.username }</li>
        </ul>
    `)*/
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
 *  Inicio de sesion, Valida el formulario de acceso
 */
router.post('/login', sessionManager.redirectIndex, (req, res) => {
    const { username, password } = req.body;

    if (username && password){
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
    
    return res.redirect('/login')
    
})


module.exports = router;