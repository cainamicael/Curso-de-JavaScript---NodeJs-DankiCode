const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

var usuarios = []
var socketIds = []//Outra "camada" de segurança

var mensagens = []

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})

io.on('connection',(socket)=>{
    socket.on('new user', function(nome){
        if(usuarios.indexOf(nome) != -1){
            //O nome já está em uso
            socket.emit('new user',{success: false})

        }else{
            //Ainda não tem ninguém com esse nome. Podemos usar
            usuarios.push(nome)
            socketIds.push(socket.id)

            socket.emit('new user',{success: true, qtdOnline: usuarios.length, usuariosOnline: usuarios, mensagens: mensagens})

            //Emit para os outros usuários dizendo que tem um novo usuário ativo.
            socket.broadcast.emit('entrou', 'Usuário ' + nome +  ' entrou!')

        }

    })

    socket.on('chat message',(obj)=>{
        if(usuarios.indexOf(obj.nome) != -1 && usuarios.indexOf(obj.nome) == socketIds.indexOf(socket.id)) {
            mensagens.push(obj)//Posso salvar no banco de dados também
            io.emit('chat message', mensagens)

        } else {
            console.log('Erro: Você não tem permissão para executar a ação.')

        }

    })

    socket.on('disconnect', () => {
        let id = socketIds.indexOf(socket.id)

        socketIds.splice(id,1)
        usuarios.splice(id,1)
        console.log(socketIds)
        console.log(usuarios)
        console.log('user disconnected')

    })

})



http.listen(3000, () => {
  console.log('listening on *:3000')

})