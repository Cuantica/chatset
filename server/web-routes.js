var express = require('express');
var router = express.Router();
const sessionManager = require('./session-manager')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

/**
 * Pagina de Inicio
 */
router.get('/',(req, res) => {
    const { userId } = req.session
    console.log(userId)

    if (userId){
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
 *  Valida el formulario de acceso
 */
router.post('/login', sessionManager.redirectIndex, (req, res) => {
    const { username, password } = req.body;

    if (username && password){
        const user = users.find( (user) => { // TODO hash

            if (user.username === username && user.password === password) {
                return user
            }

            return false
        })

        if (user){
            req.session.userId = user.id
            return res.redirect('/index')
        }
    }
    
    return res.redirect('/login')
    
})


module.exports = router;