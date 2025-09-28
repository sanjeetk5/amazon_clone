// routes/cartRoutes.js
import express from 'express';
import Cart from '../models/Cart.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET user cart
router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
  res.json(cart || { items: [] });
});

// ADD item to cart
router.post('/add', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.userId });
  if (!cart) cart = await Cart.create({ user: req.userId, items: [] });

  const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

// REMOVE item from cart
router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ user: req.userId });
  if (!cart) return res.json({ items: [] });

  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();
  res.json(cart);
});

export default router;
