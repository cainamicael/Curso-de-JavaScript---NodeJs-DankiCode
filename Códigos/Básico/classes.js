class Animal {
    constructor(nome) { //Não precisa do function
        this.nome = nome
    }

    printNome() { //Não precisa do function
        return this.nome
    }
}

class Cachorro extends Animal {
    constructor(nome) {
        super(nome) //Para atribuir ao construtor da classe Animal
    }
}

cachorro = new Cachorro('Bob')
console.log(cachorro.nome)