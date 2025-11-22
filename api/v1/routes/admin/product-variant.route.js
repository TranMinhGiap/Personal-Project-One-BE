const express = require("express");
const router = express.Router();

//controller
const controller = require("../../controllers/admin/product-variant.controller");

//validate
const validate = require("../../validates/admin/product-variant.validate");

// middleware
const checkRoleMiddleware = require('../../middlewares/admin/auth.middleware');

router.patch('/bulk-update', checkRoleMiddleware.checkRole('products_edit'), validate.edit, controller.edit)

module.exports = router;