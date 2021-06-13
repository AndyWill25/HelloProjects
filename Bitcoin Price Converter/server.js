const express = require('express')
const app = express()
const $fetch = require('node-fetch')

const PORT = process.env.PORT || 3000

app.use(express.static('Public'))

let endpoint = 'https://api.coindesk.com/v1/bpi/currentprice.json'

app.get('/', (req, res)=>{
    res.render('index.ejs', { rate: "", symbol: "" })
})

app.get('/price', (req, res)=>{
    $fetch(endpoint)
    .then(response => {
        if(!response.ok){
            throw Error(response.statusText)
        }
        return response.json()
    })
    .then(data => {
        let rate = data.bpi[req.query.country].rate_float.toFixed(2); // sets value 2 decimal places
        let symbol = data.bpi[req.query.country].symbol; // sets symbol based on country
        res.render("index.ejs", { rate, symbol })
    })
    .catch(error =>{
        console.error("Error from network: ", error);
        res.render("index.ejs", {
          rate: "There has been an error. Try again.",
          symbol: ""
        });
      })
})

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
})