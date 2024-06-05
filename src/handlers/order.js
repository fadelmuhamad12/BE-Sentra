const express = require('express');
const router = express.Router();
const OrderService = require('../services/order');

router.post('/', async (req, res) => {
  try {
    const orders = await OrderService.createOrder(req.body);
    res.status(201).send({
      code: '201',
      status: 'OK',
      data: orders
    });
  } catch (error) {
    console.error(error);
    if (error.message === 'User not found') {
      res.status(404).send({
        code: '404',
        status: 'Error',
        message: 'User not found'
      });
    } else {
      res.status(500).send({
        code: '500',
        status: 'Error',
        message: 'An error occurred while creating the order.'
      });
    }
  }
});

module.exports = router;
