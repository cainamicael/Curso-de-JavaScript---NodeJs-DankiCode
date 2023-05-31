const fs = require('fs')
const path = require('path')

const pathFile = path.join(__dirname, 'danki.txt')

fs.readFile(pathFile, (err, data) => {
    console.log(data.toString())//Para ficar visível ao invés de ficar em buffer

})