const express = require('express')
const tasksController = require('./controllers/tasksController.js')
const path = require('path')

const app = express()

//Middleware setando o ejs
app.set('view engine', 'ejs')
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);

// Middleware para fazer o parse do corpo da solicitação
app.use(express.urlencoded({ extended: true })); 

// Rota para listar tarefas
app.get('/', tasksController.listTasks)

// Rota para adicionar tarefas
app.post('/add', tasksController.addTask)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
