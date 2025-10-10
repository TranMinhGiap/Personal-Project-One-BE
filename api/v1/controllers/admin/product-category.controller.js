const ProductCategory = require('../../models/product-category.modal');
const sendErrorHelper = require('../../../../helpers/sendError.helper');

// [GET] /api/v1/product-category
module.exports.index = async (req, res) => {
  try {
    const condition = {
      deleted: false
    }
    const records = await ProductCategory.find(condition);
    res.json({
      success: true,
      status: 200,
      message: "Lấy dữ liệu thành công !",
      data: records,
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}