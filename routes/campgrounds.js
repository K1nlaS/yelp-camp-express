// Express Imp
const express = require("express");
const router = express.Router();

// Utils Imp
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const { storage } = require("../cloudinary/index");
const multer = require("multer");
const upload = multer({ storage });

//Controllers Imp
const campgrounds = require("../controllers/campgrounds");

// Routes

router.route("/")
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground))

router.route("/new")
  .get(isLoggedIn, campgrounds.renderNewForm)

router.route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.route("/:id/edit")
  .get(isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router;