const express = require("express");
const router = express.Router();

//controller
const controller = require("../../controllers/admin/product-category.controller");

//validate
const validate = require("../../validates/admin/product-category.validate");

router.get('/', controller.index)

router.post('/create', validate.create, controller.create)

router.patch('/edit/:id', validate.edit, controller.edit)

router.patch('/change-position/:id', validate.changePosition, controller.changePosition)

router.patch('/change-status/:id', validate.changeStatus, controller.changeStatus)

router.patch('/change-multi', validate.changeMulti, controller.changeMulti)

router.delete('/delete/:id', controller.delete)

router.get('/detail/:id', controller.detail)

module.exports = router;