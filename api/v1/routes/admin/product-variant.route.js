const express = require("express");
const router = express.Router();

//controller
const controller = require("../../controllers/admin/product-variant.controller");

//validate
const validate = require("../../validates/admin/product-variant.validate");

// middleware
const checkRoleMiddleware = require('../../middlewares/admin/auth.middleware');

router.post('/create', checkRoleMiddleware.checkRole('products_create'), validate.create, controller.create)

router.patch('/bulk-update', checkRoleMiddleware.checkRole('products_edit'), validate.edit, controller.edit)

router.delete('/delete/:id', checkRoleMiddleware.checkRole('products_delete'), controller.delete)

module.exports = router;