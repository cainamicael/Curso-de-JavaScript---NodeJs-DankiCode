//Módulos
const express = require('express')
var bobyParser = require('body-parser')
const path = require('path')

const mongoose = require('mongoose')
const Posts = require('./Posts.js')

var session = require('express-session')

const app = express()

//Dizendo que nosso app vai usar sessões
app.use(session({
    secret: 'sdgijqe9dgarg64ag2e0eaFGH',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
  }));


//Conectando ao mongo
mongoose.connect('mongodb+srv://root:mn60B7jIvkruNND3@cluster0.dmxkhyz.mongodb.net/dankicode?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {console.log('Conectado ao banco de dados com sucesso');})
.catch(err => {console.log(err.message);});

//Configurações
app.use(bobyParser.json())
app.use(bobyParser.urlencoded({extended: true}))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/pages'))

//Rotas
app.get('/', (req, res) => {
    //Para saber se estamos usando a barra de busca ou não
    if(req.query.busca == null) { 
        Posts.find({}).sort({'_id': -1}).exec()
        .then(posts => {
            //Temos que fazer isso para poder encurtar a descrição
            posts = posts.map(val => {
              return {
                titulo: val.titulo,
                conteudo: val.conteudo,
                descricaoCurta: val.conteudo.substring(0, 100),
                imagem: val.imagem,
                slug: val.slug,
                categoria: val.categoria
              }

            })

            Posts.find({}).sort({'views': -1}).limit(3).exec()//Mostra as maiores views
            .then(postsTop => {
                postsTop = postsTop.map(val => {
                    return {
                        titulo: val.titulo,
                        conteudo: val.conteudo,
                        descricaoCurta: val.conteudo.substring(0, 100),
                        imagem: val.imagem,
                        slug: val.slug,
                        categoria: val.categoria,
                        views: val.views
                    }

                })

                res.render('home', {posts: posts, postsTop:postsTop})


            })
            .catch(e => console.log(e.message))

        })
        .catch(e => console.log(e.message))

    } else { 
        //Usamos a barra de busca
        Posts.find({ titulo: { $regex: req.query.busca, $options: 'i' } }).exec()//Para buscar textos parciais do título
        .then(posts => {
            posts = posts.map(val => {
                return {
                  titulo: val.titulo,
                  conteudo: val.conteudo,
                  descricaoCurta: val.conteudo.substring(0, 100),
                  imagem: val.imagem,
                  slug: val.slug,
                  categoria: val.categoria
                }
  
              })

            res.render('busca', { posts: posts, contagem: posts.length})

        })
        .catch(e => console.log(e.message))

    }

})

app.get('/:slug', (req, res) => { //URLs Amigáveis
    //res.send(req.params.slug)
    Posts.findOneAndUpdate({slug: req.params.slug}, {$inc: {views: 1}}, {new: true}).exec()//Filtrar onde o parametro é igual ao slug passado e incremantar 1 na view
    .then(resposta => {
        if(resposta != null) {//A resposta diz se existe o slug ou vai retornar null
            Posts.find({}).sort({'views': -1}).limit(3).exec()//Mostra as maiores views
            .then(postsTop => {
                postsTop = postsTop.map(val => {
                    return {
                        titulo: val.titulo,
                        conteudo: val.conteudo,
                        descricaoCurta: val.conteudo.substring(0, 100),
                        imagem: val.imagem,
                        slug: val.slug,
                        categoria: val.categoria,
                        views: val.views
                    }

                })

                res.render('single', {noticia: resposta, postsTop: postsTop})

            })
            .catch(e => console.log(e.message))

        } else {
            res.redirect('/')//Para se não existir o slug, voltar para o home

        }
    

    })
    .catch(e => console.log(e.message))


})

app.get('/admin/login', (req, res) => {
    //Caso não tenha sido criada, vamos criar
    if(req.session.login == null) { 
        req.session.login = 'Guilherme'
        res.send('Sua sessão foi criada')

    } else {
        //Se já existe, vamos mostrar o valor
        res.send(req.session.login)

    }

})

//Servidor
app.listen(5000, () => {
    console.log('Server rodando')
    
})