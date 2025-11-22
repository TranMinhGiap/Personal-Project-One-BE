const sendErrorHelper = require('../../../../helpers/sendError.helper');

module.exports.edit = (req, res, next) => {
  if(!req.body){
    return sendErrorHelper.sendError(res, 400, "Chưa có dữ liệu biến thể cần cập nhật !");
  }
  next();
}