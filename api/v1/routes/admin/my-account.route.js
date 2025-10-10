const express = require("express");
const router = express.Router();

//controller
const controller = require("../../controllers/admin/my-account.controller");

router.get('/', controller.index)

module.exports = router;