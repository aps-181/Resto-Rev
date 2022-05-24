const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
// const ExpressError = require('../utils/ExpressError')
// const Campground = require('../models/campground')
// const { campgroundSchema } = require('../schemas')
const { isLoggedin, validateCampground, isAuthor } = require('../middleware')
const campgrounds = require('../controllers/campgrounds')


const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedin, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
// .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files)
//     res.send('IT WORKED!')
// })

router.get('/new', isLoggedin, campgrounds.renderNewForm)


router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedin, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.udpateCampground))
    .delete(isLoggedin, isAuthor, catchAsync(campgrounds.deleteCampground))


router.get('/:id/edit', isLoggedin, isAuthor, catchAsync(campgrounds.renderEditForm))


// router.post('/', isLoggedin, validateCampground, catchAsync(campgrounds.createCampground))



// router.put('/:id', isLoggedin, isAuthor, validateCampground, isAuthor, catchAsync(campgrounds.udpateCampground))

// router.delete('/:id', isLoggedin, isAuthor, catchAsync(campgrounds.deleteCampground))

module.exports = router