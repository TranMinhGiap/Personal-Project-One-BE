const sendErrorHelper = require('../../../../helpers/sendError.helper');

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