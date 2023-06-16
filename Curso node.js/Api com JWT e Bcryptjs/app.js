require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.urlencoded({extended: true}))//Configura para leitura de json
app.use(express.json())

//Public route
app.get('/', (req, res) => {
  res.status(200).json({msg: "Bem vindo a nossa api"})
})

app.listen(process.env.PORT, () => {
  console.log('Server rodando na porta ' + process.env.PORT)
})