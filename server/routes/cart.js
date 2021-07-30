const express = require('express');
const {
  addCart,
  getAllCarts,
  removeCart,
  increaseCount,
  decreaseCount,
  checkoutCart,
} = require('../controller/cart');
const { protect } = require('../middleware/auth');
const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/add', addCart);
router.get('/getall', getAllCarts);
router.delete('/remove/:productId', removeCart);
router.delete('/checkout', checkoutCart);

router.patch('/increase/:productId', increaseCount);
router.patch('/decrease/:productId', decreaseCount);

module.exports = router;
