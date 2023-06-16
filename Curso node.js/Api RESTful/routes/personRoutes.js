const router = require('express').Router()
const Person = require('../models/Person.js')

//Create
router.post('/', async (req, res) => { //Tiro o person, pois já foi setado no index
  const {name, salary, approved} = req.body

  //Mini verificação. O ideal é ter  uma verificação para cada campo
  if(!name) {
      res.status(422).json({erro: "O nome é obrigatório"})
  }

  const person = {name, salary, approved}

  try{
      await Person.create(person)
      res.status(201).json({message: "Pessoa inserida com sucesso"})

  } catch (e) {
      res.status(500).json({erro: e})

  }
})

//Read
router.get('/', async (req, res) => {
  try {
    const person = await Person.find()
    res.status(200).json(person)
  } catch (e) {
    res.status(500).json({erro: e})
  }
})

//Read single
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id

    const person = await Person.findOne({_id: id})
    res.status(200).json(person)
  } catch (e) {
    res.status(500).json({erro: e})
  }
})

module.exports = router
