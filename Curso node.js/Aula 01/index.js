//Cabeçalho do servidor
const http = require('http') //Vamos importar do módulo

const hostName = '127.0.0.1' //Localhost
const port = 3000

//Montando o servidor
const server = http.createServer((req, res)=>{
    res.statusCode = 200//Resposta para quem está acessando o server
    res.setHeader('Content-Type', 'text/plain')

    res.end('Hello World')//O que vai mostrar quando o user acessar

})

server.listen(port, hostName, () => {
    console.log('Servidor está rodando')
    
})