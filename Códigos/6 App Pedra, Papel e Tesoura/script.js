var elementos = document.querySelectorAll('.player-options div > img')//Player side
var elementos2 = document.querySelectorAll('.enemy-options div > img')//Enemy side
var vitoriasPlayer = document.getElementById('vitorias-player')
var vitoriasInimigo = document.getElementById('vitorias-inimigo')
var totVitP = 0
var totVitI = 0
var playerOpt = ''
var enemyOpt = ''

function limpaTela() {
    elementos.forEach(elemento => {
        elemento.style.opacity = 0.3
    })

    elementos2.forEach(elemento => {
        elemento.style.opacity = 0.3
    })
}

function validarVitoria() {
    let vencedor = document.querySelector('.vencedor')

    if(playerOpt == 'papel') {
        if(enemyOpt == 'papel') {
            //empate
            vencedor.innerHTML = 'O jogo foi empatado'
            totVitP++
            vitoriasPlayer.innerHTML = `Vitórias do player: ${totVitP}`
            totVitI++
            vitoriasInimigo.innerHTML = `Vitórias do player: ${totVitI}`
            setTimeout(()=>{limpaTela()}, 800)

        } else if(enemyOpt == 'tesoura') {
            //inimigo ganhou
            vencedor.innerHTML = 'O inimigo ganhou'
            totVitI++
            vitoriasInimigo.innerHTML = `Vitórias do player: ${totVitI}`
            setTimeout(()=>{limpaTela()}, 800)

        } else if(enemyOpt == 'pedra') {
            //player ganhou
            vencedor.innerHTML = 'O player ganhou'
            totVitP++
            vitoriasPlayer.innerHTML = `Vitórias do player: ${totVitP}`
            setTimeout(()=>{limpaTela()}, 800)

        }

    } else if(playerOpt == 'tesoura') {
        if(enemyOpt == 'tesoura') {
            //empate
            vencedor.innerHTML = 'O jogo foi empatado'
            totVitP++
            vitoriasPlayer.innerHTML = `Vitórias do player: ${totVitP}`
            totVitI++
            vitoriasInimigo.innerHTML = `Vitórias do player: ${totVitI}`
            setTimeout(()=>{limpaTela()}, 800)

        } else if(enemyOpt == 'pedra') {
            //inimigo ganhou
            vencedor.innerHTML = 'O inimigo ganhou'
            totVitI++
            vitoriasInimigo.innerHTML = `Vitórias do player: ${totVitI}`
            setTimeout(()=>{limpaTela()}, 800)

        } else if(enemyOpt == 'papel') {
            //player ganhou
            vencedor.innerHTML = 'O player ganhou'
            totVitP++
            vitoriasPlayer.innerHTML = `Vitórias do player: ${totVitP}`
            setTimeout(()=>{limpaTela()}, 800)

        }
    } else if(playerOpt == 'pedra') {
        if(enemyOpt == 'pedra') {
            //empate
            vencedor.innerHTML = 'O jogo foi empatado'
            totVitP++
            vitoriasPlayer.innerHTML = `Vitórias do player: ${totVitP}`
            totVitI++
            vitoriasInimigo.innerHTML = `Vitórias do player: ${totVitI}`
            setTimeout(()=>{limpaTela()}, 800)

        } else if(enemyOpt == 'papel') {
            //inimigo ganhou
            vencedor.innerHTML = 'O inimigo ganhou'
            totVitI++
            vitoriasInimigo.innerHTML = `Vitórias do player: ${totVitI}`
            setTimeout(()=>{limpaTela()}, 800)

        } else if(enemyOpt == 'tesoura') {
            //player ganhou
            vencedor.innerHTML = 'O player ganhou'
            totVitP++
            vitoriasPlayer.innerHTML = `Vitórias do player: ${totVitP}`
            setTimeout(()=>{limpaTela()}, 800)

        }
    } else {
        vencedor.innerHTML = 'Inicie o Jogo'

    }

}

function resetarJogo() {
    let vencedor = document.querySelector('.vencedor')
    vencedor.innerHTML = 'Área do Vencedor'
    totVitP = 0
    vitoriasPlayer.innerHTML = 'Vitórias do player: 0'
    totVitI = 0
    vitoriasInimigo.innerHTML = 'Vitórias do inimigo: 0'

    elementos.forEach(elemento => {
        elemento.style.opacity = 1
    })

    elementos2.forEach(elemento => {
        elemento.style.opacity = 1
    })
    
}

//para deixar as imagens que não foram selecionadas com a opacidade baixa
function resetOpacityPlayers() {
    for(var i = 0; i < elementos.length; i++) {
        elementos[i].style.opacity = 0.3
        
    }
}

function resetInimigo() {
    const enemyOptions = document.querySelectorAll('.enemy-options div')

    for(var i = 0; i < enemyOptions.length; i++) {      
        enemyOptions[i].childNodes[0].style.opacity = 0.3

    }

}

function inimigoJogar() {
    var rand = Math.floor(Math.random()*3)//Para gerar um inteiro aleatorio entre 0 e 2

    const enemyOptions = document.querySelectorAll('.enemy-options div')
    resetInimigo()

    for(var i = 0; i < enemyOptions.length; i++) {
        if(i == rand) {
            enemyOptions[i].childNodes[0].style.opacity = 1 //Uso do childNodes
            enemyOpt = enemyOptions[i].childNodes[0].getAttribute('opt')

        }

    }

    validarVitoria()

}

for(var i = 0; i < elementos.length; i++) {
    elementos[i].addEventListener('click', (t) => {
        resetOpacityPlayers();
        t.target.style.opacity = 1 //Para deixar a opacidade alta da imagem selecionada
        playerOpt = t.target.getAttribute('opt')

        inimigoJogar()
        
    })

}