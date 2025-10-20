const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});
const uploadCloudMiddleware = require('../../middlewares/admin/uploadCloud.middleware');

//controller
const controller = require("../../controllers/admin/upload-cloud.controller");

router.post(
  '/',
  upload.array('upload', 10),
  uploadCloudMiddleware.upload,
  controller.index
)

module.exports = router;