const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})

http.listen(3000, () => {
    console.log('Servidor em que vamos usar socket iniciado')
})