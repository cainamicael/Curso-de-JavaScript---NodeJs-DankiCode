//Spread
var nomes = [{nome: 'João'}, {nome: 'Felipe'}]

//Junta com o array de nomes, no início
const objetos = [...nomes,{
    nome: 'Guilherme'
}]

console.log(objetos) //Vai mostrar tudo

//Rest
//Os parâmetros ficam disponíveis em formato de array. Posso colocar um número indefinido de parâmetros
function testes(...par){
    console.log(par)

}

testes(1, 2, 3, 4, 5, 6, {nome: 'Guilherme'})