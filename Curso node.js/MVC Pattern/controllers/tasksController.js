const taskModel = require('../models/tasksModel.js')

// Função para listar as tarefas
function listTasks(req, res) {
    const tasks = taskModel.getTasks()
    res.render('index', { tasks })
    //res.send(tasks)
}

// Função para adicionar a tarefa
function addTask(req, res) {
    const task = req.body.task
    taskModel.addTask(task)
    res.redirect('/')
}

module.exports = {
    listTasks,
    addTask
}
