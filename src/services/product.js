const prisma  = require('../db')


const create = async (newProduct) => {

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

  return product
}
const getBy = async () => {
  const products = await prisma.product.findMany()

  return products
}

const getOneById = async (options) => {
  const opts = {
    ...options,
    where: {
      ...options.where
    }
  }
  const products = await prisma.product.findUnique(opts)

  return products
}

const updatedBy = async (payload, options) => {
  const opts = {
    ...options,
    where: {
      ...options.where
    }
  }
  const updateProduct = await prisma.product.update({
    data: {
     name: payload.name,
     image: payload.image,
     description: payload. description,
     price: payload.price,
     rating: payload.rating,
     status: payload.status,
     quantity: payload.quantity 
   }, 
    where: opts.where
  })

  return updateProduct
}

const deletedBy = async (options) => {
  const opts = {
    ...options,
    where: {
      ...options.where
    }
  }
  const products = await prisma.product.delete(opts)

  return products
}


module.exports ={
  getBy,
  getOneById,
  updatedBy,
  deletedBy,
  create
}