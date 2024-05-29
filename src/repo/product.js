// Layered for handle validation

const express = require('express')
const router = express.Router()
const prisma  = require('../db')

router.get('/', async(req, res) => {
  const product = await prisma.product.findMany()

  res.send({
    code: '200',
    status: 'OK',
    data: product
  })
})

router.get('/:id', async(req, res) => {
  const productId = req.params.id

  const data = await prisma.product.findUnique({ where: { id: parseInt(productId) }})

  if(!data) {
    return res.status(400).send('Product not found')
  }

  res.send({
    code: '200',
    status: 'OK',
    data: data
  })
})

router.post('/', async (req, res) => {
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

router.put('/:id', async(req, res) => {
  const productId = req.params.id
  const { name, image, description, price, rating, status, quantity } = req.body

  const updateProduct = await prisma.product.update({
    where: {
      id: parseInt(productId)
    },
    data: {
      name, 
      image,
      description,
      price, 
      rating, 
      status, 
      quantity
    }
  })

  res.send({
    code: '201',
    status: 'Edit Product Successfully',
    data: updateProduct
  })

})

router.delete('/:id', async(req, res) => {
  const productId = req.params.id

  await prisma.product.delete({
    where: {
      id: parseInt(productId)
    }
  })

  res.send({
    code: '200',
    status: 'Deleted',
  })
})


module.exports = router