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
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static('public'))

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
app.use('/character', require('./controllers/character'))
app.use('/faves', require('./controllers/faveAnime'))
app.use('/characterFaves', require('./controllers/faveCharacter'))
app.use('/aboutMe', require('./controllers/aboutMe'))
app.use('/planToWatch', require('./controllers/planToWatch'))
app.use('/planToWatchFave', require('./controllers/planToWatchFave'))




// home route
app.get('/', (req, res) => {
    axios.get("https://api.jikan.moe/v3/anime")
        .then(res => console.log(res.data))
        // .then(data => console.log(data))
        .catch(err => console.error)
    res.render('home')
})

// profile route
app.get('/profile', isLoggedIn, async (req, res) => {
    res.locals.currentUser = req.user;
    // console.log("this should be req user", req.user)
    db.aboutMe.findOne({
        where: {
            userId: res.locals.currentUser.id
        }
    })
    .then(aboutMeText => {
        // console.log("ABOUT ME TEXT:", aboutMeText)
        db.favoriteAnime.findAll({
            where: {
                userId: res.locals.currentUser.id
            }
        })
            .then(faves => {
                // console.log("faves!!!!!!!!!!!", faves)
                db.favoriteCharacter.findAll({
                    where: {
                        userId: res.locals.currentUser.id
                    }
                })
                    .then(charFaves => {
                        // console.log(charFaves)
                        db.planToWatch.findAll({
                            where: {
                                userId: res.locals.currentUser.id
                            }
                        })
                        .then(planFaves => {
                            res.render("profile", { characterResults: charFaves, results: faves, planToWatchResults: planFaves, aboutMe: aboutMeText ? aboutMeText.personalText : ""})
                        })
                    })
            })
            .catch(error => {
                console.log(error)
            })
    })
    
})

// anime route
app.get('/anime', (req, res) => {
    res.render('anime')
})

app.get('/character', (req, res) => {
    res.render('character')
})

app.get('/planToWatch', (req, res) => {
    res,render('planToWatch')
})



app.listen(process.env.PORT || 3000, () => {
    console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("auth_practice running on port 3000")
})