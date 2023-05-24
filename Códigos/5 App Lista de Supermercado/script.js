var itens = []
    
document.querySelector('input[type=submit]')
    .addEventListener('click', () => {
        var nomeProduto = document.querySelector('input[name=nome_produto]')
        var precoProduto = document.querySelector('input[name=valor_produto]')

        if(nomeProduto.value != '' && precoProduto.value != '') {
            itens.push({ //Pega os valores do input e adiciona no array
                nome: nomeProduto.value,
                valor: parseFloat(precoProduto.value)
            })
    
            //Adicionando dinamicamente os itens
            var listaProdutos = document.querySelector('.lista-produtos')
            var somatorio = itens.map(i => i.valor).reduce((a, c) => a + c)
            listaProdutos.innerHTML = '' //Para não ficar duplicando
    
            itens.forEach((val, index) => {
                listaProdutos.innerHTML += `
                    <div class="lista-produto-single">
                        <h3>${val.nome}</h3>
                        <h3 class="price-produto"><span>R$${(val.valor).toFixed(2)}</span></h3>
                        <button class="remover" onclick="removerItem(${index})">remover</button>
                    </div>`
            })
    
            //Limpando os inputs
            nomeProduto.value = ''
            precoProduto.value = ''
    
            let elementoSoma = document.querySelector('.soma-produto h1')
            elementoSoma.innerHTML = `Total: R$ ${somatorio.toFixed(2)}`
        } else {
            alert('Insira todos os valores para continuar')
        }
        
    })

// Função para remover um item da lista
function removerItem(index) {
    if(itens.length == 1){
        limparRegistros()
    } else {
        itens.splice(index, 1) // Remove o item do array
        let listaProdutos = document.querySelector('.lista-produtos')
        var somatorio = itens.map(i => i.valor).reduce((a, c) => a + c)
        listaProdutos.innerHTML = ''

        itens.forEach((val, index) => {
            listaProdutos.innerHTML += `
                <div class="lista-produto-single">
                    <h3>${val.nome}</h3>
                    <h3 class="price-produto"><span>R$${(val.valor).toFixed(2)}</span></h3>
                    <button class="remover" onclick="removerItem(${index})">remover</button>
                </div>`
        })

        let elementoSoma = document.querySelector('.soma-produto h1')
        elementoSoma.innerHTML = `Total: R$ ${somatorio.toFixed(2)}`
    }
    
}

// Limpando todos os registros
function limparRegistros(){
    itens = []
    document.querySelector('.lista-produtos').innerHTML = ''
    document.querySelector('.soma-produto h1').innerHTML = 'Total: R$0.00'
    
}