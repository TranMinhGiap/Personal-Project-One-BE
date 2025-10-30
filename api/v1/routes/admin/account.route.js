const express = require("express");
const router = express.Router();

//controller
const controller = require("../../controllers/admin/account.controller");

//validate
const validate = require("../../validates/admin/account.validate");

//middleware
const checkRoleMiddleware = require('../../middlewares/admin/auth.middleware');

router.get('/', checkRoleMiddleware.checkRole('account_view'), controller.index)

router.get('/create', validate.create, controller.create)

router.get('/change-multi', validate.changeMulti, controller.changeMulti)

router.get('/detail/:id', checkRoleMiddleware.checkRole('account_view'), controller.detail)

module.exports = router;