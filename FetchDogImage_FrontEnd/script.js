let image = document.getElementById('pic');
image.setAttribute('src', "https://images.dog.ceo/breeds/pyrenees/n02111500_7655.jpg")

let endpoint = "https://dog.ceo/api/breeds/image/random"

let btn = document.getElementById('btn')
btn.addEventListener('click', ()=>{
    fetch(endpoint)
    .then(function(response){ //receiving json
        // console.log(response)
        // response.json()
        return response.json() //parsing json into object and sending to next function
    })
    .then(function(data){
        // console.log(data)
        image.setAttribute('src', data.message)
    })
    .catch(function(error){
        console.log('There was an error:', error)
    })
})

// request URL

// get our JSON and then parse

// do something with data

// handle errors