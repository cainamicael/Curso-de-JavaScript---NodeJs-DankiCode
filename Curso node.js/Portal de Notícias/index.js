/*
    ver se da para entrar sem session
    ver pq as vezes quando cadastra pede o login novamente
    front do editar
*/

//Módulos
const express = require('express')
//var bobyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const Posts = require('./Posts.js')
var session = require('express-session')
const Usuarios = require('./Usuarios.js')
const fileupload = require('express-fileupload')

const app = express()

//Conectando ao mongo
mongoose.connect('mongodb+srv://root:mn60B7jIvkruNND3@cluster0.dmxkhyz.mongodb.net/dankicode?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {console.log('Conectado ao banco de dados com sucesso');})
.catch(err => {console.log(err.message);});

//Configurações
//Dizendo que nosso app vai usar sessões
app.use(session({
    secret: 'sdgijqe9dgarg64ag2e0eaFGH',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
  }));

//Dizer que vamos ter o upload de arquivos
app.use(fileupload({
useTempFiles: true,
tempFileDir: path.join(__dirname, 'temp')
}))

//Não precisa usar o bobyParser
app.use(express.json())
app.use(express.urlencoded({extended: true}))
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

            Posts.find({}).sort({'views': -1}).limit(6).exec()//Mostra as maiores views
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
            Posts.find({}).sort({'views': -1}).limit(6).exec()//Mostra as maiores views
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





//Parte do painel de gestão



var erro = ''

//Pegar os dados do formulario
app.post('/admin/login', (req, res) => {
    Usuarios.find({}).exec()//Collection com os usuários
    .then(usuarios => {
        usuarios.forEach(val => {
            
            if(val.login === req.body.login && val.senha === req.body.senha)  {
                req.session.login = req.body.login
                req.session.senha = req.body.senha
    
            } else {
                erro = 'erro'

            }
    
        })
        
        res.redirect('/admin/login')

    })
    .catch(e => console.log(e.message))

})

//Depois que a rota acima é redirecionada
app.get('/admin/login', (req, res) => {
    //Caso não tenha sido criada, vamos criar
    if(req.session.login == null) { 
        res.render('admin-login', {erro: erro})

    } else {
        //Se já existe, vamos mostrar o valor
        Posts.find({}).sort({'_id': -1}).exec()
        .then(posts => {
            //Temos que fazer isso para poder encurtar a descrição
            posts = posts.map(val => {
              return {
                id: val._id,
                titulo: val.titulo,
                conteudo: val.conteudo,
                descricaoCurta: val.conteudo.substring(0, 100),
                imagem: val.imagem,
                slug: val.slug,
                categoria: val.categoria
              }

            })

            res.render('admin-painel', {posts: posts})
        
        })

    }

})

app.get('/admin/logout', (req, res) => {
    req.session.destroy( err => {
        if(err){
            console.log(err.message)

        } else {
            erro = ''
            res.redirect('/admin/login')

        }
    })
})

//Quando clicarmos no submit do cadastro da notícia, vamos para esta rota
app.post('/admin/cadastro', (req, res) => {
    if(req.files != undefined) {

        let formato = req.files.arquivo.name.split('.')
        var imagem = ''

        //Configurando para aceitar somente jpg
        if(formato[formato.length - 1] == 'jpg') {
            imagem = new Date().getTime() + '.jpg'
            req.files.arquivo.mv(__dirname + '/public/images/' + imagem)//Vai mover para a pasta e renomear o arquivo para não ter nome repetido

        } else {
            fs.unlinkSync(req.files.arquivo.tempFilePath)
        }

        //Inserir no banco de dados
        Posts.create({
            titulo: req.body.titulo_noticia,
            conteudo: req.body.noticia,
            imagem: 'http://localhost:5000/public/images/' + imagem,
            slug: substituirCaracteresEspeciais(req.body.titulo_noticia),
            categoria: req.body.categoria,
            autor: 'admin',
            views: 0
        })

    } else {
        Posts.create({
            titulo: req.body.titulo_noticia,
            conteudo: req.body.noticia,
            imagem: req.body.url_imagem,
            slug: substituirCaracteresEspeciais(req.body.titulo_noticia),
            categoria: req.body.categoria,
            autor: 'admin',
            views: 0
        })

    }

    res.redirect('/admin/login')

})

//Quando clicarmos no X para deletar
app.get('/admin/deletar/:id', (req, res) => {

    Posts.findOne({_id: req.params.id})
    .then(attr => {
        var img = attr.imagem
        img = img.split('/')
        var imagem = img[img.length -1]
        console.log(imagem)

        var imgFile = path.join(__dirname, `/public/images/${imagem}`)

        //Para remover a imagem depois de deletar
        if (fs.existsSync(imgFile)) {
            fs.unlinkSync(imgFile)
            console.log('Imagem removida com sucesso')
        } else {
            console.log('A imagem era via url')
        }

        Posts.deleteOne({_id: req.params.id})
        .then(() => {
            res.redirect('/admin/login')
            
        })

    })

})

//Quando clicarmos em editar
app.get('/admin/editar/:id', (req, res) => {
    if(req.session.login != null) {
        Posts.find({_id: req.params.id})
        .then((post) => {
            res.render('editar', {post: post[0]})
            
        })

     } else {
        res.redirect('/admin/login')
     }
    

})

app.post('/admin/editado/:id', (req,res) => {
    //img atual
    Posts.findOne({_id: req.params.id})
    .then(post => {

        var img = post.imagem.split('/')
        imagemAtual = img[img.length -1]
        var pathFile = path.join(__dirname, `/public/images/${imagemAtual}`)

        if(!req.files){//se o upload estiver vazio
            if(req.body.url_imagem == '') {
                //Se também o espaço do url estiver vazio, logo não vamos mexer na imagem
                Posts.findOneAndUpdate({_id: req.params.id}, {
                    titulo: req.body.titulo_noticia,
                    categoria: req.body.categoria,
                    conteudo: req.body.noticia
                }, {new: true})
                .then(() => {})
                .catch(e => console.log(e.message))

            } else {
                //se o url estiver com algum valor
                Posts.findOneAndUpdate({_id: req.params.id}, {
                    titulo: req.body.titulo_noticia,
                    categoria: req.body.categoria,
                    conteudo: req.body.noticia,
                    imagem: req.body.url_imagem
                }, {new: true})
                .then(() => {})
                .catch(e => console.log(e.message))

                if (fs.existsSync(pathFile)) {
                    fs.unlinkSync(pathFile)
                    console.log('Imagem removida com sucesso')
                } else {
                    console.log('O arquivo não existe.')
                    console.log(img)
                }
            }

        } else {
            //Tenho que fazer o upload
            let formato = req.files.arquivo.name.split('.')
            var imagem = ''
    
            //Configurando para aceitar somente jpg
            if(formato[formato.length - 1] == 'jpg') {
                imagem = new Date().getTime() + '.jpg'
                req.files.arquivo.mv(__dirname + '/public/images/' + imagem)//Vai mover para a pasta e renomear o arquivo para não ter nome repetido

                //Faz o upload
                Posts.findOneAndUpdate({_id: req.params.id}, {
                    titulo: req.body.titulo_noticia,
                    categoria: req.body.categoria,
                    conteudo: req.body.noticia,
                    imagem: 'http://localhost:5000/public/images/' + imagem
                }, {new: true})
                .then(() => {})
                .catch(e => console.log(e.message))

                if (fs.existsSync(pathFile)) {
                    fs.unlinkSync(pathFile)
                    console.log('Imagem removida com sucesso')
                } else {
                    console.log('O arquivo não existe.')
                    console.log(img)
                }

            } else {
                fs.unlinkSync(req.files.arquivo.tempFilePath)

            }

        }

        res.redirect('/admin/login')


    })

})

//Servidor
app.listen(5000, () => {
    console.log('Server rodando')
    
})

//Para termos o slug de maneira automática
function substituirCaracteresEspeciais(palavra) {
    const caracteresEspeciais = {
      'á': 'a',
      'à': 'a',
      'ã': 'a',
      'â': 'a',
      'é': 'e',
      'è': 'e',
      'ê': 'e',
      'í': 'i',
      'ì': 'i',
      'î': 'i',
      'ó': 'o',
      'ò': 'o',
      'õ': 'o',
      'ô': 'o',
      'ú': 'u',
      'ù': 'u',
      'û': 'u',
      'ç': 'c',
      '^': '',
      '~': '',
      '#': '',
      ' ': '-'
    };
  
    let palavraSemAcento = palavra.toLowerCase();
  
    for (let caractere in caracteresEspeciais) {
      const expressaoRegular = new RegExp(caractere, 'g');
      palavraSemAcento = palavraSemAcento.replace(expressaoRegular, caracteresEspeciais[caractere]);
    }

    function removerEspacosFinais(string) {
        return string.replace(/\s+$/, '');
      }

    return removerEspacosFinais(palavraSemAcento);
    
  }