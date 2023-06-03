const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})

//Para sabermos quando o usuário for conectado
io.on('connection', socket => { //O socket faz referência ao usuário
   
    socket.on('chat message', (obj) => {
        io.emit('chat message', obj) //Estou enviando o obj para todos os clientes

    })

})

http.listen(3000, () => {
    console.log('Servidor em que vamos usar socket iniciado')

})