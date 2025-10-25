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

module.exports.changeStatus = (req, res, next) => {
  // nhận kiểm tra có status hay không
  if(!req.body.status){
    return sendErrorHelper.sendError(res, 400, "Chưa có trạng thái muốn cập nhật !");
  }
  // Nếu có phải là 1 trong 2 giá trị "active" hoặc "inactive"
  if(!['active', 'inactive'].includes(req.body.status)){
    return sendErrorHelper.sendError(res, 400, "Giá trị cập nhật không hợp lệ !");
  }
  next();
}

module.exports.changeMulti = (req, res, next) => {
  // nhận kiểm tra có type hay không
  if(!req.body.type){
    return sendErrorHelper.sendError(res, 400, "Chưa có hành động thay đổi !");
  }
  // nhận kiểm tra có ids hay không
  if(!req.body.ids){
    return sendErrorHelper.sendError(res, 400, "Chưa có danh mục muốn thay đổi !");
  }
  // Nếu có type phải là 1 trong 3 giá trị "active" hoặc "inactive" hoặc "deleted-all"
  if(!['active', 'inactive', 'deleted-all'].includes(req.body.type)){
    return sendErrorHelper.sendError(res, 400, "Hành động không hợp lệ !");
  }
  next();
}