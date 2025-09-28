// routes/orderRoutes.js
import express from 'express';
import Order from '../models/Order.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// CREATE order
router.post('/', auth, async (req, res) => {
  const { items, totalAmount, shippingAddress } = req.body;
  const order = await Order.create({ user: req.userId, items, totalAmount, shippingAddress });
  res.status(201).json(order);
});

// GET all orders of user
router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.userId }).populate('items.product');
  res.json(orders);
});

// GET single order
router.get('/:id', auth, async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

export default router;
