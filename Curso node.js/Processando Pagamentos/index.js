const express = require('express')
const fs = require('fs')
const path = require('path')
require('dotenv/config')
//const stripe = require('stripe')(process.env.SECRET_API)

//Usando chave de teste
const stripe = require('stripe')('sk_test_51NIu1gKBMGEzBZ2CDhVVrJke8J9Uw5HDdEVttpIaexCYFhViCjexZBl5dyLpgHX090CCZMrgTh9yd3gIlJ4izLww00uBmmutH6')

const port = 5000

const app = express()

//middlewares
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('index')
})

const YOUR_DOMAIN = 'http://localhost:'+port;

app.get('/redirecionarpagamento', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
        price_data: {
          currency: 'brl',
          product_data: {
            name: 'Danki Code',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/sucesso?token={CHECKOUT_SESSION_ID}`, //Para passar o token para ter segurança
    cancel_url: `${YOUR_DOMAIN}?falha`,
  })

  res.redirect(303, session.url);
})

app.get('/sucesso', async (req, res) => {
    if(req.query.token != null) {
        try {
            const session = await stripe.checkout.sessions.retrieve(req.query.token)
    
            if(session.payment_status == 'paid') {
                //libera o produto
                //envia email
                res.send('Pago')
            } else {
                res.send('Não foi pago')
            }
        } catch(e) {
            res.send('Falhou')
        }

    } else {
        res.send('Precisamos do token')

    }

})

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port)
})
