const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/characterResults', (req, res)=>{
    let characterSearch = req.query.characterSearch
    axios.get(`https://api.jikan.moe/v3/search/character?q=${characterSearch}`)
    .then(apiData => {
        console.log("this is CHAR APIDATA:", apiData.data.results)
        let characterResults = apiData.data.results
        res.render('characterResults', {characterResults: characterResults})
    })
    .catch(error => {
        console.error
    })
})

router.get('/:mal_id', (req, res) => {
    let characterSearch = req.params.mal_id
    console.log("this is the CHAR MAL ID:", characterSearch)
    axios.get(`https://api.jikan.moe/v3/search/character?q=${characterSearch}`)
    .then(idResults => {
        // console.log("this is single CHAR APIDATA:", idResults.data)
        let animeId = req.params.mal_id
        let name = idResults.data.name
        let image_url = idResults.data.image_url

        res.render('characterDetail', {name: name, title, image_url: image_url, animeId: animeId})
    })
})




module.exports = router;