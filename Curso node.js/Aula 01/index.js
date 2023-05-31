const http = require('http')
const fs = require('fs')
const path = require('path')

const hostName = '127.0.0.1'
const port = 3000

//const path = require('path')
const caminhoENomeDoArquivo = path.join(__dirname, 'danki.txt')

/*
//criar novo arquivo
fs.writeFile(caminhoENomeDoArquivo , 'Aqui vai o conteúdo do aarquivo', erro =>{
    if(erro) throw erro
    console.log('O arquivo foi criado com sucesso')

})*/

//Cria novo arquivo ou insere conteúdo depois do que já existe
fs.appendFile(caminhoENomeDoArquivo, '\nAdicionando este conteúdo', err => {
    if(err) throw err
    console.log('Salvo novamente com sucesso!')

})

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