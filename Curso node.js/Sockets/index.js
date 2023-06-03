const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})

io.on('connection', (socket) => {

    //io.emit('conectado', 'Estou conectado')//Para emitir no console do navegador (front-end)

    socket.broadcast.emit('novo usuario', 'Novo usuario se conectou')//Para notificar a todos, menos ao que se conectou
    
    socket.on('disconnect', () => {
        console.log('Desconectado')//Quando fecha a janela

    })
})

http.listen(3000, () => {
    console.log('listening on *:3000')

})
