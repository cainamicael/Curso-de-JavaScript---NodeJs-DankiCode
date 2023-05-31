const fs = require('fs')
const path = require('path')

const pathFile = path.join(__dirname, 'danki.txt')
const novoNome = path.join(__dirname, 'Novo nome do arquivo.txt')

//Renomeando arquivo
fs.rename(pathFile, novoNome, err => {
    if(!err) console.log('Renomeado')
})

//Deletando arquivo
fs.unlink(novoNome, err => {
    console.log('Arquivo foi deletado')
})