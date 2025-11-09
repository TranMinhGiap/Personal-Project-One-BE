const express = require("express");
const router = express.Router();

//controller
const controller = require("../../controllers/admin/product.controller");

//validate
const validate = require("../../validates/admin/product.validate");

// middleware
const checkRoleMiddleware = require('../../middlewares/admin/auth.middleware');

router.get('/', checkRoleMiddleware.checkRole('products_view'), controller.index)

router.post('/create', checkRoleMiddleware.checkRole('products_create'), validate.create, controller.create)

router.patch('/change-status/:id', checkRoleMiddleware.checkRole('products_edit'), validate.changeStatus, controller.changeStatus)

module.exports = router;