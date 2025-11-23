const sendErrorHelper = require('../../../../helpers/sendError.helper');

module.exports.edit = (req, res, next) => {
  if(!req.body){
    return sendErrorHelper.sendError(res, 400, "Chưa có dữ liệu biến thể cần cập nhật !");
  }
  next();
}
module.exports.create = (req, res, next) => {
  if(!req.body){
    return sendErrorHelper.sendError(res, 400, "Chưa có dữ liệu biến thể cần thêm !");
  }
  const {
    product_id,
    price,
    discountPercentage,
    stock,
    storage,
    color,
    images,
    status
  } = req.body;

  // Validate product_id
  if (!product_id) {
    return sendErrorHelper.sendError(res, 400, "Chưa có id sản phẩm !");
  }

  // Validate price
  if (price === undefined || price === null) {
    return sendErrorHelper.sendError(res, 400, "Chưa có giá cho biến thể cần thêm !");
  }
  if (typeof price !== "number" || price < 0) {
    return sendErrorHelper.sendError(res, 400, "Giá phải là số !");
  }

  // Validate discountPercentage
  if (discountPercentage !== undefined) {
    if (typeof discountPercentage !== "number" || discountPercentage < 0 || discountPercentage > 100) {
      return sendErrorHelper.sendError(res, 400, "% giảm giá phải là số và nằm trong khoảng 0 - 100 !");
    }
  }

  // Validate stock
  if (stock === undefined || stock === null) {
    return sendErrorHelper.sendError(res, 400, "Chưa có số lượng biến thể cần thêm !");
  }
  if (typeof stock !== "number" || stock < 0) {
    return sendErrorHelper.sendError(res, 400, "Số lượng cho biến thể phải là số !");
  }

  // Validate storage
  if (!storage || typeof storage !== "string") {
    return sendErrorHelper.sendError(res, 400, "Chưa có giá trị dung lượng cho biến thể cần thêm !");
  }

  // Validate color
  if (!color || typeof color !== "string") {
    return sendErrorHelper.sendError(res, 400, "Chưa có màu sắc cho biến thể cần thêm !");
  }

  // Validate images
  if (images !== undefined) {
    if (!Array.isArray(images)) {
      return sendErrorHelper.sendError(res, 400, "Ảnh cho biến thể phải là mảng !");
    }

    const invalidImages = images.some(i => typeof i !== "string");
    if (invalidImages) {
      return sendErrorHelper.sendError(res, 400, "URL ảnh chưa đúng định dạng (string) !");
    }
  }

  // Validate status
  if (status !== undefined) {
    const allowed = ["active", "inactive"];
    if (!allowed.includes(status)) {
      return sendErrorHelper.sendError(res, 400, "Giá trị trạng thái của biến thể không hợp lệ !");
    }
  }
  next();
}