const express = require("express")
const router = express.Router()
const db = require("../models")

//we need an index route that will show all faves
router.get("/", (req, res) => {
    db.favoriteCharacter.findAll()
    .then(charFaves => {
        console.log(charFaves)
        res.render("profile", {characterResults: charFaves})
    })
    .catch(error => {
        console.log(error)
    })
})


// we need a post route that will save a fave
//the url endpoint we will be using for creating a fave will be this:
//"/faves/addFave"
router.post("/addCharacterFave", (req, res) => {
    //"JSON.parse is being called on JSON.stringify which is calling our req.body" This allows us to format it in a way that sequelize can use
    const data = JSON.parse(JSON.stringify(req.body))
    console.log("this is character data", data)
    db.favoriteCharacter.create({
        name: data.name,
        mal_id: data.mal_id,
        userId: res.locals.currentUser.id,
        about: data.about,
        image_url: data.image_url,
        voice_actors: data.voice_actors.length > 0 ? data.voice_actors : undefined,
        animeName: data.animeName ? data.animeName : "No anime found",
        nicknames: data.nicknames
    })
    .then(createdFave => {
        console.log("HELLO FAVE", createdFave)
        res.redirect('/profile')
    })
    .catch(error => {
        console.log(error)
        //can also use console.error
    })
    .finally(created => {
        console.log(created)
    })

})



//we are going to add a delete, that will allow us to remove a fave
// router.delete("/:id", (req, res) => {
//     // console.log("this is the id\n", req.params.id)
//     db.favorite.destroy({
//         where: { id: req.params.id }
//     })
//     .then(deletedItem => {
//         // Destroy returns "1" if smting is deleted and "0" is nothing deleted
//         // console.log("you deleted: ", deletedItem)
//         res.redirect("/faves")
//     })
//     .catch(error => {
//         console.error
//     })
// })

//time permitting, a show route for an individual fave

router.get("/:mal_id", (req, res) => {
    // console.log(res)
    console.log("this is the char fave id\n", req.params.mal_id)
    db.favoriteCharacter.findOne({
        where: { mal_id: req.params.mal_id }
    })
    .then(foundCharFave => {
        res.render("faveCharacterDetail", { animeName: foundCharFave.animeName,
             mal_id: foundCharFave.mal_id, data: foundCharFave.data, image_url: foundCharFave.image_url, 
            userId: foundCharFave.userId, voice_actors: foundCharFave.voice_actors, 
        nicknames: foundCharFave.nicknames, name: foundCharFave.name})
    })
    .catch(error => {
        console.error
    })
})

module.exports = router