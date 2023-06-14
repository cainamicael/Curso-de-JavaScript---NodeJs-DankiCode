const express = require('express')
const tasksController = require('./controllers/tasksController.js')

const app = express()

//Middleware setando o ejs
app.set('views engine', 'ejs')

// Rota para listar tarefas
app.get('/', tasksController.listTasks)

// Rota para adicionar tarefas
app.post('/add', tasksController.addTask)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
