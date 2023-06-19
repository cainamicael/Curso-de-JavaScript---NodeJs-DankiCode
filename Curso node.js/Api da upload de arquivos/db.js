require('dotenv/config')
const mongoose = require('mongoose')

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.SECRET_BD}@cluster0.dmxkhyz.mongodb.net/${process.env.NOME_BD}?retryWrites=true&w=majority`)

    console.log('Conectado com sucesso')
}

main().catch((err) => console.log(err))

module.exports = main;