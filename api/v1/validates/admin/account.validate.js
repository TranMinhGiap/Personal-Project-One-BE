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

module.exports.changeMulti = (req, res, next) => {
  if(!req.body){
    return sendErrorHelper.sendError(res, 400, "Chưa có dữ liệu !");
  }
  // nhận kiểm tra có type hay không
  if(!req.body.type){
    return sendErrorHelper.sendError(res, 400, "Chưa có hành động thay đổi !");
  }
  // Nếu có type phải là 1 trong 3 giá trị "active" hoặc "inactive" hoặc "deleted-all"
  if(!['active', 'inactive', 'deleted-all'].includes(req.body.type)){
    return sendErrorHelper.sendError(res, 400, "Hành động không hợp lệ !");
  }
  // nhận kiểm tra có ids hay không
  if(!req.body.ids || !Array.isArray(req.body.ids) || req.body.ids.length === 0){
    return sendErrorHelper.sendError(res, 400, "Chưa có danh mục muốn thay đổi hoặc dữ liệu không hợp lệ !");
  }
  next();
}

module.exports.changeStatus = (req, res, next) => {
  if(!req.body){
    return sendErrorHelper.sendError(res, 400, "Chưa có dữ liệu !");
  }
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