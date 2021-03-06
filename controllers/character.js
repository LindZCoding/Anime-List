const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/characterResults', (req, res)=>{
    let characterSearch = req.query.characterSearch
    axios.get(`https://api.jikan.moe/v3/search/character?q=${characterSearch}`)
    .then(apiData => {
        // console.log("this is CHAR APIDATA:", apiData.data.results)
        let characterResults = apiData.data.results
        res.render('characterResults', {characterResults: characterResults})
    })
    .catch(error => {
        console.error
    })
})

router.get('/:mal_id', (req, res) => {
    let characterSearched = req.params.mal_id
    console.log("this is the CHAR MAL ID:", characterSearched)
    axios.get(`https://api.jikan.moe/v3/character/${characterSearched}/`)
    .then(idResults => {
        console.log("this is single CHAR APIDATA:", idResults.data)
        let mal_id = req.params.mal_id
        let name = idResults.data.name
        let image_url = idResults.data.image_url
        let about = idResults.data.about
        let nicknames = idResults.data.nicknames.length > 0 ? idResults.data.nicknames.join(", ") : ""
        let voice_actors = idResults.data.voice_actors.length > 0 ? idResults.data.voice_actors : undefined
        // console.log("voice actors:", voice_actors)
        let animeName = idResults.data.animeography.length > 0 ? idResults.data.animeography[0].name : ""
        // let voiceActorImage = idResults.data.voice_actors.length > 0 ? idResults.data.voice_actors[0].image_url : undefined
        
        res.render('characterDetail', {name: name, image_url: image_url, about: about, 
            nicknames: nicknames, animeName: animeName, voice_actors: voice_actors, mal_id: mal_id})
    })
})




module.exports = router;