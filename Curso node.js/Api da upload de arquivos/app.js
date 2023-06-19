require('dotenv').config()
require('./db') //Para ter no console se foi conectado ou não
const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

const pictureRouter = require('./Routes/picture')
app.use('/pictures', pictureRouter)//A rota "Matriz"

app.listen(PORT, () => {
    console.log('Server rodando na porta ' + PORT)
})
