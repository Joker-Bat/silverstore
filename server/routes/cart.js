const express = require('express');
const { addCart, getAllCarts, removeCart } = require('../controller/cart');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/add', protect, addCart);
router.get('/getall', protect, getAllCarts);
router.delete('/remove/:productId', protect, removeCart);

module.exports = router;
