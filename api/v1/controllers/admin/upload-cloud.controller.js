const sendErrorHelper = require('../../../../helpers/sendError.helper');

// [POST] api/v1/admin/upload-cloud-image/
module.exports.index = async (req, res) => {
  try {
    if(req.body.upload)
    res.json({ url: req.body.upload });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Upload fail", error.message);
  }
}