const express = require('express')
require('dotenv/config')
const PORT = process.env.PORT

const app = express()

//Middlewares para trabalhar com json
app.use(express.urlencoded({extended: true}))
app.use(express.json())



app.listen(PORT, () => {
  console.log('Server rodando na porta ' + PORT)
})