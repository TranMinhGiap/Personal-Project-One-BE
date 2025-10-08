const sendErrorHelper = require('../../../../helpers/sendError.helper');

module.exports.loginPost = (req, res, next) => {
  if(!req.body.email){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập email !", "Chưa có email !");
  }
  if(!req.body.password){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập mật khẩu !", "Chưa có password !");
  }
  next();
}