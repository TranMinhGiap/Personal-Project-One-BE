const sendErrorHelper = require('../../../../helpers/sendError.helper');

module.exports.create = (req, res, next) => {
  if(!req.body.title){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập tên nhóm quyền !");
  }
  if(!req.body.status || !["active", "inactive"].includes(req.body.status)){
    // model đã có enum rồi không cần cũng được !
    return sendErrorHelper.sendError(res, 400, "Yêu cầu cung cấp trạng thái !");
  }
  next();
}

module.exports.changeMulti = (req, res, next) => {
  // nhận kiểm tra có type hay không
  if(!req.body.type){
    return sendErrorHelper.sendError(res, 400, "Chưa có hành động thay đổi !");
  }
  // nhận kiểm tra có ids hay không
  if(!req.body.ids || !Array.isArray(req.body.ids) || req.body.ids.length < 1){
    return sendErrorHelper.sendError(res, 400, "Chưa có mục muốn thay đổi !");
  }
  // Nếu có type phải là 1 trong 3 giá trị "active" hoặc "inactive" hoặc "deleted-all"
  if(!['active', 'inactive', 'deleted-all'].includes(req.body.type)){
    return sendErrorHelper.sendError(res, 400, "Hành động không hợp lệ !");
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

module.exports.edit = (req, res, next) => {
  // Chỉ cần có title là đủ
  if(!req.body.title){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập tên nhóm quyền !");
  }
  next();
}

module.exports.permissions = (req, res, next) => {
  if(!req.body){
    return sendErrorHelper.sendError(res, 400, "Chưa có dữ liệu cập nhật !");
  }
  if(!typeof req.body === 'object' || !Array.isArray(req.body.roles)){
    return sendErrorHelper.sendError(res, 400, "Dữ liệu cập nhật không hợp lệ !");
  }
  next();
}