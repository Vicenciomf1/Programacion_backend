import passport from 'passport';

import { Router } from 'express'

import path from 'path'
import { Strategy } from 'passport-local';

const usuarios = [];

passport.use('register', new Strategy({
    passReqToCallback: true
  }, (req, username, password, done) => {

    //Traer el modelo de mongoose de usuario
    //Encriptar contraseña con bcrypt
    //Si el usuario no existe guardar el usuario en la bd de mongo

    const {direccion} = req.body;
  
    const usuario = usuarios.find((usuario) => usuario.username == username);
    if (usuario) {
      return done(null, false);
    }
    const user = { username, password, direccion };
    usuarios.push(user);
    return done(null, user);
  } ));
  
passport.use('login', new Strategy((username, password, done) => {

    //Traer el modelo de usuairo de mongoose
    //Hacer el find del documento en la coleccion de usuarios (en base a nombre)

    const usuario = usuarios.find((usuario) => usuario.username == username && usuario.password == password);
    if (!usuario) {
        return done(null, false);
    }

    //Comparar contraseñas con el bcrypt

    usuario.contador = 0;
    //redireccionar a la pagina principal
    return done(null, usuario);
}));

passport.serializeUser((user, done) => {
done(null, user.username);
});

passport.deserializeUser((username, done) => {
const usuario = usuarios.find(usuario => usuario.username == username);
done(null, usuario);
});

const authWebRouter = new Router()

authWebRouter.use(passport.initialize());
authWebRouter.use(passport.session());

authWebRouter.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/login.html'))
    }
})

authWebRouter.post('/login', passport.authenticate('login',
    {
        successRedirect: '/',
        failureRedirect: '/faillogin'
    }
));

authWebRouter.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/register.html'))
    }
})

authWebRouter.post('/register', passport.authenticate('register',
    {
        successRedirect: '/',
        failureRedirect: '/failregister'
    }
));


authWebRouter.get('/faillogin', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/login-error.html'))
})

authWebRouter.get('/failregister', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/register-error.html'))
})

authWebRouter.get('/logout', (req, res) => {
    const username = req.user?.username ?? 'visitante'
    req.logout()
    res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { username })
})

export default authWebRouter