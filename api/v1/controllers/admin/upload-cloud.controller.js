const sendErrorHelper = require('../../../../helpers/sendError.helper');

// [POST] api/v1/admin/upload-cloud-image/
module.exports.index = async (req, res) => {
  try {
    // Linh hoạt: Nếu 1 file → { url: ... }, nếu nhiều → { urls: [...] }
    if (req.body.urls) {
      if (req.body.urls.length === 1) {
        res.json({ url: req.body.urls[0] }); // Single cho CKEditor
      } else {
        res.json({ urls: req.body.urls }); // Multiple cho form ảnh
      }
    } else {
      res.json({ urls: [] }); // Không file
    }
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Upload fail", error.message);
  }
};