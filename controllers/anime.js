const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/results', (req, res)=>{
    let animeSearch = req.query.animeSearch
    axios.get(`https://api.jikan.moe/v3/search/anime?q=${animeSearch}`)
    .then(apiData => {
        console.log("this is APIDATA:", apiData.data.results)
        let animeResults = apiData.data.results
        res.render('results', {results: animeResults})
    })
    .catch(error => {
        console.error
    })
})

router.get('/:mal_id', (req, res) => {
    let animeSearched = req.params.mal_id
    console.log("this is the MAL ID:", animeSearched)
    axios.get(`https://api.jikan.moe/v3/anime/${animeSearched}/`)
    .then(idResults => {
        // console.log("this is single APIDATA:", idResults.data)
        let animeId = req.params.mal_id
        let title = idResults.data.title
        let title_english = idResults.data.title_english
        let synopsis = idResults.data.synopsis
        let image_url = idResults.data.image_url
        let episodes = idResults.data.episodes
        let score = idResults.data.score

        res.render('animeDetail', {title_english: title_english, title: title, synopsis: synopsis, image_url: image_url, episodes: episodes, score: score, animeId: animeId})
    })
})




module.exports = router;