const express = require("express")
const router = express.Router()
const db = require("../models")

//we need an index route that will show all faves
router.get("/", (req, res) => {
    db.favoriteAnime.findAll()
    .then(faves => {
        console.log(faves)
        res.render("profile", {results: faves})
    })
    .catch(error => {
        console.log(error)
    })
})


// we need a post route that will save a fave
//the url endpoint we will be using for creating a fave will be this:
//"/faves/addFave"
router.post("/addFave", (req, res) => {
    //"JSON.parse is being called on JSON.stringify which is calling our req.body" This allows us to format it in a way that sequelize can use
    const data = JSON.parse(JSON.stringify(req.body))
    console.log("this is anime data", data)
    db.favoriteAnime.create({
        name: data.title,
        animeId: data.animeId,
        userId: res.locals.currentUser.id,
        synopsis: data.synopsis,
        image: data.image_url,
        episodes: data.episodes,
        score: data.score
    })
    .then(createdFave => {
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



//delete route for anime faves and char faves
router.post("/:deleteType/:mal_id", (req, res) => {
    console.log("this is the id i want to delete", req.params.mal_id)
    if(req.params.deleteType === "anime") {
        db.favoriteAnime.destroy({
            where: { animeId: req.params.mal_id, userId: res.locals.currentUser.id }
        })
        .then(deletedItem => {
            // Destroy returns "1" if smting is deleted and "0" if nothing deleted
            console.log("you deleted: ", deletedItem)
            res.redirect("/profile")
        })
        .catch(error => {
            console.error
        })
    } else if(req.params.deleteType === "character"){
        db.favoriteCharacter.destroy({
            where: { mal_id: req.params.mal_id, userId: res.locals.currentUser.id }
        })
        .then(deletedItem => {
            // Destroy returns "1" if smting is deleted and "0" if nothing deleted
            console.log("you deleted: ", deletedItem)
            res.redirect("/profile")
        })
        .catch(error => {
            console.error
        })
    } else if(req.params.deleteType === "planToWatch"){
        db.planToWatch.destroy({
            where: { animeId: req.params.mal_id, userId: res.locals.currentUser.id }
        })
        .then(deletedItem => {
            // Destroy returns "1" if smting is deleted and "0" if nothing deleted
            console.log("you deleted: ", deletedItem)
            res.redirect("/profile")
        })
        .catch(error => {
            console.error
        })
    }
    
})


router.get("/:mal_id", (req, res) => {
    // console.log(res)
    console.log("this is the fave id\n", req.params.mal_id)
    db.favoriteAnime.findOne({
        where: { mal_id: req.params.mal_id }
    })
    .then(foundFave => {
        res.render("faveAnimeDetail", { name: foundFave.name,
             animeId: foundFave.animeId, synopsis: foundFave.synopsis, image: foundFave.image, 
            userId: foundFave.userId, episodes: foundFave.episodes, score: foundFave.score})
    })
    .catch(error => {
        console.error
    })
})

module.exports = router