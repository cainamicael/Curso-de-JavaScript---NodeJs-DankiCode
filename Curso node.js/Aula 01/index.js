const fs = require('fs')
const readLine = require('readline')

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Digite o seu nome: ', res => {
    console.log(`O nome do usuário é ${res}`)

    rl.question('Qual a sua idade? ', idade => {
        console.log(`A idade do usuário é: ${idade}`)

    })

})

rl.on('close', () => {
    console.log('Tchau')//Quando sair do console
    process.exit(0)

})