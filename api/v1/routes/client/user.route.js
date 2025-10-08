const express = require("express");
const router = express.Router();

// controller
const controller = require("../../controllers/client/user.controller")

// validate
const validate = require('../../validates/client/account.validate');

router.post('/login', validate.loginPost, controller.login)
router.post('/register', validate.createPost, controller.register)

module.exports = router;