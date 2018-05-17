const express = require('express') ///////
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const { Nuxt, Builder } = require('nuxt')
const nuxtConfig = require('./nuxt.config')
const nuxt = new Nuxt(nuxtConfig)
const service = require('./app/api/MainSevice')
const app = express()
service(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('static'))
app.use(
  session({
    secret: 'sam-fashion-sale',
    cookie: { maxAge: 60 * 60 * 1000 * 24 },
    resave: false,
    saveUninitialized: false
  })
)

if (nuxtConfig.dev) {
  const promise = new Builder(nuxt).build()
  promise
    .then(() => {
      app.use(nuxt.render)
      app.listen(17100)
      console.log('Server is listening on http://localhost:16100')
    })
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}
