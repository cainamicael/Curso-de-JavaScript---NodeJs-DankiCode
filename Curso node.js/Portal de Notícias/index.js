//Módulos
const express = require('express')
var bobyParser = require('body-parser')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

//Configurações
app.use(bobyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))

//Rotas
app.get('/', (req, res) => {
    console.log(req.query)//Para quando estivermos usando a pesquisa. Não é slug

    if(req.query.busca == null) { //Para saber se estamos usando a barra de busca ou não
        res.send('home')

    } else { //Usamos a barra de busca
        res.send(`Você fez a busca pelo termo: ${req.query.busca}`)

    }

})

app.get('/:slug', (req, res) => { //URLs Amigáveis
    res.send(req.params.slug)
})

//Servidor
app.listen(5000, ()=>{
    console.log('O server está rodando')
})