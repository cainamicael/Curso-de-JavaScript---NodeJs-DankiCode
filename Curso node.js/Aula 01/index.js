const http = require('http')
const fs = require('fs')
const path = require('path')

const hostName = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'index.html')

    //O req mostra todas as informações da requisição
    //Trabalhando com endpoints
    if(req.url == '/danki' ) {
        //Abrindo um arquivo html
        fs.readFile(filePath, (error, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data) //É o próprio arquivo html, no caso, é o prório filePath
        res.end()

        })

    } else {
        return res.end()//Sem o endpoint, retorna vazio - Se não tiver o else, carrega infinitamete
        
    }
  
})

server.listen(port, hostName, () => {
  console.log('Servidor está rodando')
})