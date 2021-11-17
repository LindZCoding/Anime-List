require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
const db = require("./models")






// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body parser middelware
app.use(express.urlencoded({extended:false}))

// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))
app.use('/anime', require('./controllers/anime'))
app.use('/faves', require('./controllers/faveAnime'))




// home route
app.get('/', (req, res)=>{
    axios.get("https://api.jikan.moe/v3/anime")
    .then(res => console.log(res.data))
    // .then(data => console.log(data))
    .catch(err => console.error)
    res.render('home')
})

// profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    db.favoriteAnime.findAll()
    .then(faves => {
        console.log(faves)
        res.render("profile", {results: faves})
    })
    .catch(error => {
        console.log(error)
    })
})

// anime route
app.get('/anime', (req,res) => {
    res.render('anime')
})



app.listen(3000, ()=>{
    console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("auth_practice running on port 3000")
})