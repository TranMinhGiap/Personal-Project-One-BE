const sendErrorHelper = require('../../../../helpers/sendError.helper');

module.exports.edit = (req, res, next) => {
  if(!req.body){
    return sendErrorHelper.sendError(res, 400, "Chưa có dữ liệu gửi lên !");
  }
  if(req.body.email){
    return sendErrorHelper.sendError(res, 400, "Không được thay đổi email !");
  }
  if(!req.body.fullName){
    return sendErrorHelper.sendError(res, 400, "Chưa có họ và tên !");
  }
  next();
}