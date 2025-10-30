const sendErrorHelper = require('../../../../helpers/sendError.helper');

module.exports.create = (req, res, next) => {
  if(!req.body){
    return sendErrorHelper.sendError(res, 400, "Chưa có dữ liệu gửi lên !");
  }
  if(!req.body.email){
    return sendErrorHelper.sendError(res, 400, "Chưa có email !");
  }
  if(!req.body.password){
    return sendErrorHelper.sendError(res, 400, "Chưa có mật khẩu !");
  }
  if(!req.body.fullName){
    return sendErrorHelper.sendError(res, 400, "Chưa có họ và tên !");
  }
  if(!req.body.role_id){
    return sendErrorHelper.sendError(res, 400, "Chưa có vai trò !");
  }
  next();
}