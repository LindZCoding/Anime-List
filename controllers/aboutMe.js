const express = require('express')
const router = express.Router()
const axios = require('axios');
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

// router.post('/update/:userId', async (req, res) => {
//     // console.log("update req data", req.body)
//     // db.aboutMe.findOne({
//     //     where: {
//     //         userId: req.params.userId
//     //     }
//     // })
//     .then(foundAboutMe => {
//         if(!foundAboutMe) {
//             //create new
//             db.aboutMe.create({
//                 userId: req.params.userId,
//                 personalText: req.body.aboutMe
//             })
//             .then(() => res.redirect("/profile"))
//         } else {
//             foundAboutMe.personalText = req.body.aboutMe
//             foundAboutMe.save().then(() => res.redirect("/profile"))
//         }
        
//     })
    
// })

router.post('/update/:userId', isLoggedIn, (req, res) => {
    db.aboutMe.create({
        userId: req.params.userId,
        personalText: req.body.aboutMe
    })
    .then(createdAboutMe => {
        console.log('this is created about me', createdAboutMe)
        res.redirect('/profile')
    })
})

router.get('/update/:userId', isLoggedIn, (req, res) => {
    db.aboutMe.findOne({
        where: {
            userId: res.locals.currentUser.id,
            personalText: req.body.aboutMe
        }
    })
    .then(foundAboutMe => {
        console.log('found about me', foundAboutMe)
        // res.redirect('/profile')
        res.render('profile', {foundAboutMe: foundAboutMe})
    })
})

module.exports = router;