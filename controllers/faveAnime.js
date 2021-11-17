const express = require("express")
const router = express.Router()
const db = require("../models")

//we need an index route that will show all faves
router.get("/", (req, res) => {
    db.favoriteAnime.findAll()
    .then(faves => {
        res.render("results", {results: faves})
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
        name: data.title_english,
        imdbId: data.imdbId
    })
    .then(createdFave => {
        console.log("db instance created: \n", createdFave)
        res.redirect(`/faves/${createdFave.id}`)
    })
    .catch(error => {
        console.log(error)
        //can also use console.error
    })

})



//we are going to add a delete, that will allow us to remove a fave
router.delete("/:id", (req, res) => {
    // console.log("this is the id\n", req.params.id)
    db.favorite.destroy({
        where: { id: req.params.id }
    })
    .then(deletedItem => {
        // Destroy returns "1" if smting is deleted and "0" is nothing deleted
        // console.log("you deleted: ", deletedItem)
        res.redirect("/faves")
    })
    .catch(error => {
        console.error
    })
})

//time permitting, a show route for an individual fave

router.get("/:id", (req, res) => {
    console.log("this is the fave id\n", req.params.id)
    db.favorite.findOne({
        where: { id: req.params.id }
    })
    .then(foundFave => {
        res.render("faveDetail", { title: foundFave.title, imdbId: foundFave.imdbId, date: foundFave.createdAt})
    })
    .catch(error => {
        console.error
    })
})

module.exports = router