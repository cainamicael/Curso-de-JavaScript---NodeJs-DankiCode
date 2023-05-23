const somar = (x, y) => x + y
const calcular = (x, y, computar) => computar(x, y)

const resultado = calcular(20, 30, somar)
console.log(resultado)