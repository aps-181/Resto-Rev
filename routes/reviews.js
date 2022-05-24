const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
// const ExpressError = require('../utils/ExpressError')
// const Campground = require('../models/campground')
// const Review = require('../models/review')
const { validateReview, isLoggedin, isReviewAuthor } = require('../middleware')
const review = require('../controllers/review')


router.post('/', isLoggedin, validateReview, catchAsync(review.createReview))




router.delete('/:reviewId', isLoggedin, isReviewAuthor, catchAsync(review.deleteReview))

module.exports = router