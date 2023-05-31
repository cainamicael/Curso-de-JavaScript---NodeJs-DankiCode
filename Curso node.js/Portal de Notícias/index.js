const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

//Para usar o body parser e integrar com o formulário
app.use( bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//Sistema para renderizar
app.engine('html', require('ejs').renderFile); //Renderizar pelo ejs
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public'))); //Setando diretório estático
app.set('views', path.join(__dirname, 'pages'));//Setando o diretório das páginas

//Rotas
app.get('/', (req, res) => {
    //Para quando estivermos usando a pesquisa. Não é slug
    console.log(req.query)

    //Para saber se estamos usando a barra de busca ou não
    if(req.query.busca == null) { 
        res.render('index', {})

    } else { 
        //Usamos a barra de busca
        res.send(`Você fez a busca pelo termo: ${req.query.busca}`)

    }

})

app.get('/:slug', (req, res) => { //URLs Amigáveis
    res.send(req.params.slug)
})

app.listen(5000, () => {
    // A porta 5000 - http://localhost:5000/
    console.log('Server rodando');
});