const prisma  = require('../db')


const create = async (newProduct) => {

  const product = await prisma.product.create({
    data: {
      name: newProduct.name,
      image: newProduct.image,
      description: newProduct.description,
      price: parseInt(newProduct.price),
      rating: newProduct.rating,
      status: newProduct.status,
      quantity: parseInt(newProduct.quantity)
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
     price: parseInt(payload.price),
     rating: payload.rating,
     status: payload.status,
     quantity: parseInt(payload.quantity)
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

const payment = async (items) => {
  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.id },
    });

    if (product && product.quantity >= item.quantity) {
      const newQuantity = product.quantity - item.quantity;
      const newStatus = newQuantity === 0 ? 'soldout' : product.status;


      await prisma.product.update({
        where: { id: item.id },
        data: { 
          quantity: newQuantity,
          status: newStatus
        },
      });
    } else {
      throw new Error(`Product Sold`);
    }
  }
};


module.exports ={
  getBy,
  getOneById,
  updatedBy,
  deletedBy,
  create,
  payment
}