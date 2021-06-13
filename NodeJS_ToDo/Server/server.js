const express = require('express')
const app = express()
const logger = require('morgan')
app.use(logger(process.env.NODE_ENV))

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('../Client'))

const PORT = process.env.PORT || 3000

let toDoArr = [
    {
        id: 1,
        description: 'Call mom',
        isComplete: false,
    },
    {
        id: 2,
        description: 'Buy groceries',
        isComplete: false,
    },
    {
        id: 3,
        description: 'Go to the movies',
        isComplete: false,
    }
]

app.get('/', (req, res)=>{
    res.send('ROOOOOOOOOT')
})

//R - READ - GET Method
app.get('/todos', (req, res)=>{
    res.json(toDoArr)
})

let num = 4
//C - CREATE - POST Method
app.post('/todos', (req, res)=>{
    let newToDo = 
        {
            id: num++,
            description: req.body.description,
            isComplete: false
        }
    toDoArr.push(newToDo)
    res.status(201).json(newToDo)
})

//D - DELETE - DELETE Method
app.delete('/todos/:id', (req, res)=>{
    let requestedToDoID = parseInt(req.params.id)
    let requestedToDoIndex = toDoArr.findIndex(function(todo){
        return todo.id === requestedToDoID
    })
    if(requestedToDoIndex >= 0){
        let deletedToDo = toDoArr.splice(requestedToDoIndex, 1)
        res.status(223).send(deletedToDo)
    } else {
        res.send('ID does not exist')
    }
})

//U - UPDATE - PUT Method
app.put('/todos/:id', (req, res)=>{
    let requestedToDoID = parseInt(req.params.id)
    let requestedToDo = toDoArr.find(function(todo){
        return todo.id === requestedToDoID
    })
    if(requestedToDo !== undefined){
        requestedToDo.isComplete = !requestedToDo.isComplete
        res.status(224).send(requestedToDo)
    } else {
        res.status(400).send('ID does not exist for PUT backend.')
    }
})

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
})
