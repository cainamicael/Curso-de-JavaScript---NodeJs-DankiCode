const express = require('express')
const PORT = 3000

const app = express()

//Middlewares para trabalhar com json
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(PORT, () => {
  console.log('Server rodando na porta ' + PORT)
})