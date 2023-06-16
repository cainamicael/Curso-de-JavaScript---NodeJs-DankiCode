require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')

const app = express()
app.use(express.urlencoded({extended: true}))//Configura para leitura de json
app.use(express.json())

//Public route
app.get('/', (req, res) => {
  res.status(200).json({msg: "Bem vindo a nossa api"})
})

//Private route
app.get('/user/:id', checkToken, async (req, res) => {
  const id = req.params.id

  //Check if users exists
  const user = await User.findById(id, '-password')
  if(!user) {return res.status(404).json({msg: "Usuário não encontrado"})}

  res.status(200).json(user)
})

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'] //O token em sí, mais com alguns parametros antes
  const token = authHeader && authHeader.split(' ')[1]//Se veio o token, pega a segunda parte do token

  if(!token) {return res.status(401).json({msg: "Acesso negado"})}

  //Validação do token
  try {
    const secret = process.env.SECRET_JWT
    jwt.verify(token, secret)

    next()
  } catch(e) {
      res.status(400).json({msg: "Token inválido"})
  }
}

//Register User
app.post('/auth/register', async (req, res) => {
  const {name, email, password, confirmpassword} = req.body

  //Validations
  if(!name) {return res.status(422).json({msg: "Insira um nome"})}
  if(!email) {return res.status(422).json({msg: "Insira um email"})}
  if(!password) {return res.status(422).json({msg: "Insira uma senha"})}
  if(password != confirmpassword) {return res.status(422).json({msg: "As senhas devem ser iguais"})}

  //Check if user exists
  const userExists = await User.findOne({email: email})
  if(userExists) {return res.status(422).json({msg: "Já existe um usuário cadastrado com esse email"})}

  //Create password
  const salt = await bcrypt.genSalt(12)//Adiciona dificuldade na senha
  const passwordHash = await bcrypt.hash(password, salt)//Criando hash

  //Create user
  const user = {
    name,
    email,
    password: passwordHash
  }

  try {
    await User.create(user)
    res.status(201).json({msg: "Usuário criado com sucesso"})
  } catch(e) {
    console.log(e)
    res.status(500).json({erro: "Aconteceu um erro"})
  }
})

//Login
app.post('/auth/user', async (req, res) => {
  const {email, password} = req.body

  if(!email) {return res.status(422).json({msg: "Insira um email"})}
  if(!password) {return res.status(422).json({msg: "Insira uma senha"})}

  //Check if user exists
  const user = await User.findOne({email: email})
  if(!user) {return res.status(422).json({msg: "O usuário não existe"})}

  //check if password match
  const checkPassword = await bcrypt.compare(password, user.password)
  if(!checkPassword) {return res.status(404).json({msg: "Senha incorreta"})}

  //Login with JWT token
  try{
    const secret = process.env.SECRET_JWT

    //What will be sending in my token
    const token = jwt.sign({
      id: user._id,
    }, secret)

    res.status(200).json({msg: "Autenticação realizada com sucesso", token})
  } catch(e) {
      console.log(e)
      res.status(500).json({erro: "Aconteceu um erro"})
  }

})

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dmxkhyz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Conectado com sucesso')
    app.listen(process.env.PORT, () => {
      console.log('Server rodando na porta ' + process.env.PORT)
    })
})
