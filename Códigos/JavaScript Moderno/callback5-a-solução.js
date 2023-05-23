//Vamos criar um botão via js
function newButton(text, callback) {
    const $body = document.querySelector('body')
    const $button = document.createElement('button')
    $button.textContent = text //O texto do parâmetro

    callback($button) //Posso fazer o que quiser no botão, antes de indexa-lo no body

    $body.insertAdjacentElement('beforeend', $button) //Adicionando antes do fechamento da tag doby

    return $button
}

newButton('Login', (button) => {
    button.style.cssText = `
        font-size: 40px;
    `

    button.addEventListener('click', () => {
        console.log('O botão login foi clicado')
    })
})

newButton('Signup', (button) => {
    button.style.cssText = `
        font-size: 80px;
        color: red;
    `
})