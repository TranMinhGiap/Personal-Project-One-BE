const express = require("express");
const router = express.Router();

//controller
const controller = require("../../controllers/admin/account.controller");

//validate
const validate = require("../../validates/admin/account.validate");

router.get('/', controller.index)

module.exports = router;