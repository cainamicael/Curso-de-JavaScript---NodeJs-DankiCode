//Módulos
const express = require('express')
var bobyParser = require('body-parser')
const path = require('path')

const mongoose = require('mongoose')
const Posts = require('./Posts.js')

const app = express()


//Conectando ao mongo
mongoose.connect('mongodb+srv://root:mn60B7jIvkruNND3@cluster0.dmxkhyz.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso');
  })
  .catch(err => {
    console.log(err.message);
  });

//Configurações
app.use(bobyParser.json())
app.use(bobyParser.urlencoded({extended: true}))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/pages'))

//Rotas
app.get('/', (req, res) => {
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