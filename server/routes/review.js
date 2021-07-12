const express = require('express');
const { addReview, getAllReviews, removeReview } = require('../controller/review');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:productId', getAllReviews);
router.post('/add/:productId', protect, addReview);
router.delete('/remove/:productId', protect, removeReview);

module.exports = router;
