const ProductCategory = require('../../models/product-category.modal');
const sendErrorHelper = require('../../../../helpers/sendError.helper');
const paginationHelper = require("../../../../helpers/objectPagination.helper");
const searchHelper = require("../../../../helpers/search");

// [GET] /api/v1/product-category
module.exports.index = async (req, res) => {
  try {
    const { status, keyword } = req.query;
    const condition = {
      deleted: false
    }
    // Filter status
    if(status !== "all"){
      condition.status = status;
    }
    // Search
    if(keyword){
      const regKeyword = searchHelper(keyword);
      condition.title = regKeyword;
    }
    // Pagination
    const countDocument = await ProductCategory.countDocuments(condition);
    const objectPagination = paginationHelper.objectPagination(req.query, countDocument)
    const records = await ProductCategory.find(condition)
      .skip(objectPagination.skip)
      .limit(objectPagination.limit);
    res.json({
      success: true,
      status: 200,
      message: "Lấy dữ liệu thành công !",
      data: records,
      pagination: objectPagination
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}