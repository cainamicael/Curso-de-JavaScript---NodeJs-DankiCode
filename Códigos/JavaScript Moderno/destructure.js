const arr = ['Guilherme', 'João', 'Filipe']

//Armazenando em uma variável específica cada índice do array
var [a, b, c] = arr
console.log(a) //Guilherme

//Operador 
const arr2 = ['Guilherme', 'João', 'Filipe', 'Leo', 'Juliano']

var [a, b,...c] = arr2 //O a é Guilherme, o b é João, e o c é um array com o resto dos nomes
console.log(c)