const express = require('express')
require('dotenv/config')
const mongoose = require('mongoose')
const PORT = process.env.PORT

const app = express()

//Middlewares para trabalhar com json
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({message: 'Oi Express'})
})

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.SECRET_BD}@cluster0.dmxkhyz.mongodb.net/${process.env.NOME_BD}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Conectamos ao MongoDB')

    app.listen(PORT, () => {
      console.log('Server rodando na porta ' + PORT)
    })
  })
  .catch(e => console.log(e.message))
