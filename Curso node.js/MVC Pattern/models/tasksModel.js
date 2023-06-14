const tasks = ['tarefa 01', 'tarefa 02']

// Função para obter todas as tarefas
function getTasks() {
    return tasks
}

// Função para adicionar uma nova tarefa
function addTask( task ) {
    tasks.push(task)
}

module.exports = {
    getTasks,
    addTask
}
