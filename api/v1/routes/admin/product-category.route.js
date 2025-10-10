const express = require("express");
const router = express.Router();

//controller
const controller = require("../../controllers/admin/product-category.controller");

//validate
const validate = require("../../validates/admin/product-category.validate");

router.get('/', controller.index)

module.exports = router;