const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (order) => {
  const { items, totalCount, totalPaid, userId } = order;  

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const orders = await prisma.order.create({
    data: {
      totalCount: totalCount,
      totalPaid: totalPaid,
      user: {
        connect: { id: userId }
      },
      items: {
        create: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      }
    },
    include: {
      items: true
    }
  });

  return orders;
};

module.exports = {
  createOrder
};
