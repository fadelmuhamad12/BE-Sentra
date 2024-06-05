// call the express from framework
const express = require('express')
// initialize the app
const app = express()
const dotenv = require('dotenv')
const cors = require("cors");
const repoProduct = require('./handlers/product')
const auth = require('./services/auth')

dotenv.config()
const port = 2002

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use('/product', repoProduct)
app.use('/login', auth.login)
app.use('/signup', auth.signup)

app.listen(port, () => {
  console.log('Port Running On ' + port);
})