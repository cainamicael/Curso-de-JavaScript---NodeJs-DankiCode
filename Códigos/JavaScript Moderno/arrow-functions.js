const testes = (par)=>{
    console.log(par)
}

testes('olá')

//Callback
const testes2 = (texto, par)=>{
    par(texto)
}

testes2('Olá mundo', (texto)=>{
    console.log(texto)
})