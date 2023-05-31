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

//Servidor
app.listen(5000, ()=>{
    console.log('O server está rodando')
})