const saudacao = nome => alert('Olá ' + nome)

const processaEntradaUsuario = (callback) => {
    const nome = prompt('Digite seu nome: ')
    callback(nome)
}

processaEntradaUsuario(saudacao)