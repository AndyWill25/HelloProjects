const express = require('express')
const app = express()

const $fetch = require('node-fetch')

const PORT = process.env.PORT || 3000

app.use(express.static('public'))
let endpoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=fe806faed033a9b707afdfa3df618da0&language=en-US&page=1`


app.get('/', (req, res)=>{
    res.render('home.ejs')
})

app.get('/results', (req, res)=>{
    $fetch(endpoint)
    .then(response => response.json())
    .then(data => { 
        res.render("results.ejs", {movies: data.results})
    })
    .catch()
})

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
})
