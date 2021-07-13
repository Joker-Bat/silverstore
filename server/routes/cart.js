const express = require('express');
const { addCart, getAllCarts, removeCart, increaseCount, decreaseCount } = require('../controller/cart');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/add', protect, addCart);
router.get('/getall', protect, getAllCarts);
router.delete('/remove/:productId', protect, removeCart);

router.patch('/increase/:productId', protect, increaseCount);
router.patch('/decrease/:productId', protect, decreaseCount);

module.exports = router;
