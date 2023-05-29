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
app.engine('html', require('ejs').renderFile); // Renderizar pelo ejs
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public'))); // Setando diretório estático
app.set('views', path.join(__dirname, 'views'));

var tarefas = ['Arrumar o quarto', 'Comprar no supermercado']

app.post('/', (req, res) => {
    console.log(req.body.tarefa)//O que ele recebeu do post palo name - instalando o body parser
    tarefas.push(req.body.tarefa)
    res.render('index', {tarefasList:tarefas})//Pra voltar pro início

})

app.get('/', (req, res) => {
    res.render('index', {tarefasList:tarefas})//O que eu quero enviar para a página via ejs
    // Requisição - Tudo que eu sei da requisição, como headers | Resposta - O que eu vou enviar para o usuário final
});

app.get('/deletar/:id', (req, res) => {
    let id = req.params.id//Para recuperar o id
    console.log(id)
    tarefas.splice(id, 1)//Remove pelo index
    res.render('index', {tarefasList:tarefas})//O que eu quero enviar para a página via ejs
    
})

app.listen(5000, () => {
    // A porta 5000 - http://localhost:5000/
    console.log('Server rodando');
});