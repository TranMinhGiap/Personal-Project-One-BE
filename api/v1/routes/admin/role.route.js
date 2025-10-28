const express = require("express");
const router = express.Router();

//controller
const controller = require("../../controllers/admin/role.controller");

//validate
const validate = require("../../validates/admin/role.validate");

router.get('/', controller.index)

router.post('/create', validate.create, controller.create)

router.patch('/change-multi', validate.changeMulti, controller.changeMulti)

module.exports = router;