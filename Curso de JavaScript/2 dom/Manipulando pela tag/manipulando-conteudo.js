var p = document.getElementsByTagName('p')//Cria um array com todas as ocorrências do parágrafo

console.log(p[0].innerHTML)//Pega todos os paragrafos existendes e seleciona o primeiro[0] e retorna o conteudo

p[0].innerHTML = 'Novo conteúdo'//Muda o que está escrito

for (var i = 0; i < p.length; i++){ //Manipulando com laço de repetição
    p[i].innerHTML =  'Valor:' + i 
}