const express = require('express')
const router = express.Router()
const axios = require('axios');
const db = require('../models');

router.post('/update/:userId', async (req, res) => {
    console.log("update req data", req.body)
    db.aboutMe.findOne({
        where: {
            userId: req.params.userId
        }
    })
    .then(foundAboutMe => {
        if(!foundAboutMe) {
            //create new
            db.aboutMe.create({
                userId: req.params.userId,
                personalText: req.body.aboutMe
            })
            .then(() => res.redirect("/profile"))
        } else {
            foundAboutMe.personalText = req.body.aboutMe
            foundAboutMe.save().then(() => res.redirect("/profile"))
        }
        
    })
    
})


module.exports = router;