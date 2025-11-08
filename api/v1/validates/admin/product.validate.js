const sendErrorHelper = require('../../../../helpers/sendError.helper');

module.exports.create = (req, res, next) => {
  // General
  if(!req.body){
    return sendErrorHelper.sendError(res, 400, "Chưa có dữ liệu gửi lên !");
  }
  if(!req.body.title){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập tên sản phẩm !");
  }
  if(!req.body.category_id){
    return sendErrorHelper.sendError(res, 400, "Yêu cầu nhập danh mục của sản phẩm !");
  }
  if (req.body.status && !['active', 'inactive'].includes(req.body.status)) {
    return sendErrorHelper.sendError(res, 400, "Trạng thái sản phẩm không hợp lệ (status) !");
  }
  if (req.body.deleted && ![true, false].includes(req.body.deleted)) {
    return sendErrorHelper.sendError(res, 400, "Trạng thái sản phẩm không hợp lệ (deleted) !");
  }
  if (req.body.featured && ![true, false].includes(req.body.featured)) {
    return sendErrorHelper.sendError(res, 400, "Đặc điểm sản phẩm không hợp lệ !");
  }
  // Variants
  if(req.body.variants && !Array.isArray(req.body.variants)){
    return sendErrorHelper.sendError(res, 400, "Dữ liệu biến thể của sản phẩm không hợp lệ !");
  }
  next();
}