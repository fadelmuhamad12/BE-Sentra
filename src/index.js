// call the express from framework
const express = require('express')
// initialize the app
const app = express()
const dotenv = require('dotenv')
const cors = require("cors");
const repoProduct = require('./handlers/product')

dotenv.config()
const port = 2002

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use('/product', repoProduct)

app.listen(port, () => {
  console.log('Port Running On ' + port);
})