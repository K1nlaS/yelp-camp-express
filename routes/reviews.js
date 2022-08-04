// Express Imp
const express = require("express");
const router = express.Router({ mergeParams: true });

// Utils Imp
const catchAsync = require("../utils/catchAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

//Controllers Imp
const reviews = require("../controllers/reviews");

// Routes

router.route("/")
  .post(isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.route("/:reviewId")
  .delete(isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;