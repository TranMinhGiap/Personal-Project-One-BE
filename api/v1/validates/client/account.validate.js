const sendErrorHelper = require('../../../../helpers/sendError.helper');

module.exports.createPost = (req, res, next) => {
  if(!req.body.fullName){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập tên !", "Chưa có fullName !");
  }
  if(!req.body.password){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập mật khẩu", "Chưa có mật khẩu !");
  }
  if(!req.body.confirm){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu xác nhận mật khẩu", "Chưa xác nhận mật khẩu !");
  }
  if(req.body.password !== req.body.confirm){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu mật khẩu phải khớp", "Mật khẩu không khớp khi xác nhận !");
  }
  if(!req.body.email){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập email", "Chưa có email !");
  }
  next();
}

module.exports.editPatch = (req, res, next) => {
  if(!req.body.fullName){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập tên", "Chưa có tên !");
  }
  if(!req.body.email){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập email", "Chưa có email !");
  }
  next();
}

module.exports.loginPost = (req, res, next) => {
  if(!req.body.email){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập email !", "Chưa có email !");
  }
  if(!req.body.password){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập password", "Chưa có password !");
  }
  next();
}