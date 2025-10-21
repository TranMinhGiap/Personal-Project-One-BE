const sendErrorHelper = require('../../../../helpers/sendError.helper');

module.exports.create = (req, res, next) => {
  if(!req.body.title){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập tên danh mục !");
  }
  if(!req.body.status){
    // sau này cần phải kiểm soát cả giá trị vào (thỏa mãn là active/inactive nữa)
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập trạng thái danh mục (status) !");
  }
  if(req.body.deleted === ""){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập trạng thái danh mục (deleted) !");
  }
  next();
}

module.exports.edit = (req, res, next) => {
  // Chỉ cần có title là đủ
  if(!req.body.title){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập tên danh mục !");
  }
  next();
}