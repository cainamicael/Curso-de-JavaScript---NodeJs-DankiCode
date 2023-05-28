var elementos = document.querySelectorAll('[type=radio]')
var acertos = 0
var erros = 0
var totalRespostas = document.querySelectorAll('[value=correta]').length

elementos.forEach((elemento) => {
    elemento.addEventListener('change', (e) => {
        let marcado = e.target.value

        if (marcado == 'correta') {
            let parentNode = e.target.parentNode
            parentNode.style.backgroundColor = 'green'
            //recuperar o elemento vizinho que antecede a ele, no caso, o span
            e.target.previousElementSibling.style.color = 'white'

            let els = parentNode.parentNode.querySelectorAll('[type=radio]')
            

            for (var n = 0; n < els.length; n++) {
                els[n].disabled = true
            }

            acertos++

        } else if (marcado == 'incorreta') {
            let parentNode = e.target.parentNode
            parentNode.style.backgroundColor = 'red'
            //recuperar o elemento vizinho que antecede a ele, no caso, o span
            e.target.previousElementSibling.style.color = 'white'

            let els = parentNode.parentNode.querySelectorAll('[type=radio]')

            for (var n = 0; n < els.length; n++) {
                els[n].disabled = true
            }

            let correta = parentNode.parentNode.querySelector('[value=correta]')
            correta.parentNode.style.backgroundColor = 'green'
            //recuperar o elemento vizinho que antecede a ele, no caso, o span
            correta.previousElementSibling.style.color = 'white'

            erros++

        }

        if (acertos + erros === totalRespostas) {
            document.querySelector('h1').innerHTML = `Jogo de Perguntas e respostas - Seu resultado: total de acertos: ${acertos} | total de erros: ${erros}`
            alert(`Resultado no topo da página`)
        }
    })
})