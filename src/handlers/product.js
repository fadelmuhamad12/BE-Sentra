// Layered for handle validation
const express = require('express')
const router = express.Router()
const ProductService  = require('../services/product')

router.get('/', async(req, res) => {
  const product = await ProductService.getBy()

  res.send({
    code: '200',
    status: 'OK',
    data: product
  })
})

router.get('/:id', async(req, res) => {
  const productId = req.params.id

  const opts = {
    where: {
      id: parseInt(productId)
    }
  }
  const data = await ProductService.getOneById(opts)

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

  const product = await ProductService.create(req.body)
  res.send({
    code: '200',
    status: 'OK',
    data: product,
  })
})

router.put('/:id', async(req, res) => {
  const productId = req.params.id

  const opts = {
    where: {
      id: parseInt(productId)
    }
  }

  const updateProduct = await ProductService.updatedBy(req.body, opts)

  res.send({
    code: '201',
    status: 'Edit Product Successfully',
    data: updateProduct
  })

})

router.delete('/:id', async(req, res) => {
  const productId = req.params.id
  const opts = {
    where: {
      id: parseInt(productId)
    }
  }

  await ProductService.deletedBy(opts)

  res.send({
    code: '200',
    status: 'Deleted',
  })
})


router.post('/payment', async (req, res) => {
  const { items } = req.body;
  try {
    await ProductService.payment(items);
    res.send({
      code: '200',
      status: 'OK',
      message: 'Quantities updated successfully'
    });
  } catch (error) {
    res.status(400).send({
      code: '400',
      status: 'Error',
      message: error.message
    });
  }
});


module.exports = router