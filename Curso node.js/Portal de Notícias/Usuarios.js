var mongoose = require('mongoose')

var usuariosSchema = new mongoose.Schema({
    nome: String,
    login: String,
    senha: String
},{collection: 'usuarios'})

var usuarios = mongoose.model('Usuarios', usuariosSchema)

module.exports = usuarios