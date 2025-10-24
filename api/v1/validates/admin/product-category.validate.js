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

module.exports.changePosition = (req, res, next) => {
  // chấp nhận số / chuỗi số nguyên
  if(!req.body.position){
    return sendErrorHelper.sendError(res, 400, "Chưa có vị trí muốn cập nhật !");
  }
  const pos = Number(req.body.position);
  if(isNaN(pos) || !Number.isInteger(pos)){
    return sendErrorHelper.sendError(res, 400, "Vị trí cập nhật phải là số nguyên !");
  }
  next();
}