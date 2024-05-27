// call the express from framework
const express = require('express')
// initialize the app
const app = express()
const cors = require("cors");
const { PrismaClient } = require ("@prisma/client")

const prisma = new PrismaClient()
const port = 2002

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));


app.get('/product', async(req, res) => {
  const product = await prisma.product.findMany()

  res.send({
    code: '200',
    status: 'OK',
    data: product
  })
})

app.post('/product', async (req, res) => {
  const newProduct = req.body

  const product = await prisma.product.create({
    data: {
      name: newProduct.name,
      image: newProduct.image,
      description: newProduct.description,
      price: newProduct.price,
      rating: newProduct.rating,
      status: newProduct.status,
      quantity: newProduct.quantity
    }
  })
  res.send({
    code: '200',
    status: 'OK',
    data: product,
  })
})

app.listen(port, () => {
  console.log('CIEE JALAN di port ' + port);
})