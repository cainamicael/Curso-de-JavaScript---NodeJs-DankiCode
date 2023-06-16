const router = require('express').Router()
const Person = require('../models/Person.js')

//Create
router.post('/', async (req, res) => { //Tiro o person, pois já foi setado no index
  const { name, salary, approved } = req.body

  //Mini verificação. O ideal é ter  uma verificação para cada campo
  if (!name) { return res.status(422).json({ erro: "O nome é obrigatório" }) }

  const person = { name, salary, approved }

  try {
    await Person.create(person)
    res.status(201).json({ message: "Pessoa inserida com sucesso" })

  } catch (e) {
    res.status(500).json({ erro: e })

  }
})

//Read
router.get('/', async (req, res) => {
  try {
    const person = await Person.find()
    res.status(200).json(person)
  } catch (e) {
    res.status(500).json({ erro: e })
  }
})

//Read single
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const person = await Person.findOne({ _id: id })
  if (!person) { return res.status(500).json({ message: "O usuário não foi encontrado" }) }

  try {
    res.status(200).json(person)
  } catch (e) {
    res.status(500).json({ erro: e })
  }
})

//Update (put = Objeto completo, patch = Atualização parcial)
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { name, salary, approved } = req.body
  const person = { name, salary, approved }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person)

    //Retorna o valor de quantos registros foram atualizados
    if (updatedPerson.matchedCount === 0) { return res.status(500).json({ message: "O usuário não foi encontrado" }) }
    res.status(200).json(person)

  } catch (e) {
    res.status(500).json({ erro: e })
  }
})

//Delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const person = await Person.findOne({ _id: id })
  if (!person) { return res.status(500).json({ message: "O usuário não foi encontrado" }) }

  try {
    await Person.deleteOne({ _id: id })
    res.status(200).json({ message: "Usuário removido com sucesso" })
  } catch (e) {
    res.status(500).json({ erro: e })
  }
})

module.exports = router
