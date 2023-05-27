var quantidade = document.getElementById('quantidade');

quantidade.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {//Para só chamar quando apertar o enter
        document.querySelector('.overlay-loading').style.display = 'block' //Para ativar o loading
        pegaPokemons(parseInt(quantidade.value)); // Para usarmos no if

    }

})
document.querySelector('.overlay-loading').style.display = 'block' //Para ativar o loading
pegaPokemons(3)//Por padrão, caso não insira nada no input
function pegaPokemons(quantidade) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${quantidade}`)
    .then(response => response.json())
    .then(allPokemon => {
        var pokemons = []

        allPokemon.results.forEach(val =>{
            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {
                pokemons.push({nome: val.name, imagem: pokemonSingle.sprites.front_default})

                if(pokemons.length == quantidade) { //Tem que ser aqui dentro, pois é assíncrono
                    //finalizamos nossas requisições
                    var pokemonBoxes = document.querySelector('.pokemon-boxes')//Para desativar o loading
                    pokemonBoxes.innerHTML = ''//reset

                    pokemons.forEach(val => {
                        document.querySelector('.overlay-loading').style.display = 'none'
                        pokemonBoxes.innerHTML += `
                            <div class="pokemon-box">
                                <img src="${val.imagem}" alt="imagem pokemon">
                                <p>${val.nome}</p>
                            </div>`

                    })
                }
                
            })

        })

    })

}