const express = require("express");
const router = express.Router();

//controller
const controller = require("../../controllers/admin/my-account.controller");

// validate
const validate = require("../../validates/admin/my-account");

router.get('/', controller.index)

router.patch('/edit', validate.edit, controller.edit)

module.exports = router;