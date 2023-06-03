const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})

//Para sabermos quando o usuário for conectado
io.on('connection', socket => { //O socket faz referência ao usuário
    console.log('Usuário conectado ' + socket.id)//A gente pode ver detalhes da conexão

    //Vai enviar o dado para o frontend
    io.emit('conectado', 'Aqui é o conteúdo que vamos passar para o front')//no front tem que ser o mesmo nome

    //Já que o usuário é o parâmetro socket, para sabermos se ele está desconectado usamos:
    socket.on('disconnect', () => {
        console.log('Usuário desconectado')
        
    })

})

http.listen(3000, () => {
    console.log('Servidor em que vamos usar socket iniciado')

})