const express = require("express");
const router = express.Router();

//controller
const controller = require("../../controllers/admin/product-category.controller");

//validate
const validate = require("../../validates/admin/product-category.validate");

// middleware
const checkRoleMiddleware = require('../../middlewares/admin/auth.middleware');

router.get('/', checkRoleMiddleware.checkRole('products-category_view'), controller.index)

router.post('/create', checkRoleMiddleware.checkRole('products-category_create'), validate.create, controller.create)

router.patch('/edit/:id', checkRoleMiddleware.checkRole('products-category_edit'), validate.edit, controller.edit)

router.patch('/change-position/:id', checkRoleMiddleware.checkRole('products-category_edit'), validate.changePosition, controller.changePosition)

router.patch('/change-status/:id', checkRoleMiddleware.checkRole('products-category_edit'), validate.changeStatus, controller.changeStatus)

router.patch('/change-multi', checkRoleMiddleware.checkRole('products-category_edit'), validate.changeMulti, controller.changeMulti)

router.delete('/delete/:id', checkRoleMiddleware.checkRole('products-category_delete'), controller.delete)

router.get('/detail/:id', checkRoleMiddleware.checkRole('products-category_view'), controller.detail)

module.exports = router;