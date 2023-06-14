const express = require('express')
const fs = require('fs')
const path = require('path')
const stripe = require('stripe')(process.env.SECRET_API)
require('dotenv/config')

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
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  })

  res.redirect(303, session.url);
})

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port)
})