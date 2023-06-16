require('dotenv/config')
const express = require('express')

const PORT = process.env.PORT

const app = express()

//Middlewares para trabalhar com json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Rotas
const personRoutes = require('./routes/personRoutes.js')
app.use('/person', personRoutes)//Tudo que tiver /person será redirecionado para personRoutes

//Só ouve o servidor se a conexão for bem sucedida
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.SECRET_BD}@cluster0.dmxkhyz.mongodb.net/${process.env.NOME_BD}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Conectamos ao MongoDB')

    app.listen(PORT, () => {
      console.log('Server rodando na porta ' + PORT)
    })
  })
  .catch(e => console.log(e.message))
