const express = require('express');

const router = express.Router();

const { addReview, getAllReviews, removeReview } = require('../controller/review');
const { protect } = require('../middleware/auth');

router.get('/:productId', getAllReviews);
router.post('/add/:productId', protect, addReview);
router.delete('/remove/:productId', protect, removeReview);

module.exports = router;
