const fs = require('fs')
const path = require('path')

const pathFile = path.join(__dirname, 'danki.txt')

fs.readFile(pathFile, (err, data) => {
    let str = data.toString()

    let newStr = str.split('/')//Cria um array
    newStr.forEach(nome => console.log(nome))

    let newStr2 = str.substring(0, 3)//Pega os caracteres desde o indice do primeiro param. atá o indice do 2º param.
    console.log(newStr2)

})