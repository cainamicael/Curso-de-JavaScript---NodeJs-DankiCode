var date = new Date() //Já é nativo do js - sem parâmetro, retorna a data e o horário atual

console.log(date.getDate())//O dia do mês. Ex: 25
console.log(date.getDay())//O dia da semana (Domingo é zero)
console.log(date.getFullYear())//Ano
console.log(date.getHours())//Ex: 15
console.log(date.getMinutes())//Ex: 58

var date2 = new Date('05/20/2023')// Datas personalizadas MM-DD-AAAA

//Calculando diferenças de datas

console.log(date2.getTime())//Em milisegundos


var diference = (date2.getTime() - date.getTime()) / (1000 * 360 * 24)//Transformando ms em dias
console.log(diference)

 


