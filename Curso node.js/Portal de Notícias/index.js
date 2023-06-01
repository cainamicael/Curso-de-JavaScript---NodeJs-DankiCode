//Módulos
const express = require('express')
const mongoose = require('mongoose')
var bobyParser = require('body-parser')
const path = require('path')

const app = express()

mongoose.connect('mongodb+srv://root:7UqWSYx6hjbGfFfS@cluster0.dmxkhyz.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})//O obj é para usar a versão atualizada
.then(() => {console.log('Conectado ao mongo com sucesso')})
.catch(err => {console.log(err.message)})

//Configurações
app.use(bobyParser.json())
app.use(bobyParser.urlencoded({extended: true}))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/pages'))

//Rotas
app.get('/', (req, res) => {
    //Para quando estivermos usando a pesquisa. Não é slug
    console.log(req.query)

    //Para saber se estamos usando a barra de busca ou não
    if(req.query.busca == null) { 
        res.render('home', {})

    } else { 
        //Usamos a barra de busca
        res.render('busca', {})

    }

})

app.get('/:slug', (req, res) => { //URLs Amigáveis
    //res.send(req.params.slug)
    res.render(`single`, {})

})

//Servidor
app.listen(5000, () => {
    console.log('Server rodando');
});