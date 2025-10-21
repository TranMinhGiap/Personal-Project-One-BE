const ProductCategory = require('../../models/product-category.modal');
const sendErrorHelper = require('../../../../helpers/sendError.helper');
const paginationHelper = require("../../../../helpers/objectPagination.helper");
const searchHelper = require("../../../../helpers/search");

// [GET] /api/v1/product-category
module.exports.index = async (req, res) => {
  try {
    const { status, keyword, sortKey, sortValue } = req.query;
    const condition = {
      deleted: false
    }
    // Filter status
    if(status && status !== "all"){
      condition.status = status;
    }
    // Search
    if(keyword){
      const regKeyword = searchHelper(keyword);
      condition.title = regKeyword;
    }
    // Sort
    const sort = {};
    if(sortKey && sortValue){
      sort[sortKey] = sortValue;
    }
    // Pagination
    const countDocument = await ProductCategory.countDocuments(condition);
    const objectPagination = paginationHelper.objectPagination(req.query, countDocument)
    const records = await ProductCategory.find(condition)
      .skip(objectPagination.skip)
      .limit(objectPagination.limit)
      .sort(sort);
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

// [POST] /api/v1/product-category/create
module.exports.create = async (req, res) => {
  try {
    // Nếu không có vị trí => tự động tăng theo số lượng bản khi. Ngược lại có vị trí => Chuyển dạng số và giữ nguyên vị trí
    if (!req.body.position) {
      const countCategory = await ProductCategory.countDocuments();
      req.body.position = countCategory + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
    // Lưu thông tin người tạo (thông tin đã có khi chạy qua middleware auth)
    req.body.createdBy = {
      account_id: req.user.id
    }
    const record = new ProductCategory(req.body);
    await record.save();
    res.json({
      success: true,
      status: 200,
      message: "Thêm danh mục sản phẩm thành công !",
      data: record
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}

// [PATCH] /api/v1/product-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    // Nếu không có vị trí => tự động tăng theo số lượng bản khi. Ngược lại có vị trí => Chuyển dạng số và giữ nguyên vị trí
    if (!req.body.position) {
      const countCategory = await ProductCategory.countDocuments();
      req.body.position = countCategory + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
    // Lưu thong tin người cập nhật
    const updatedBy = {
      account_id: req.user.id,
      updatedAt: new Date()
    };
    // Cập nhật
    await ProductCategory.updateOne(
      { _id: req.params.id },
      {
        ...req.body,
        $push: { updatedBy: updatedBy }
      }
    )
    res.json({
      success: true,
      status: 200,
      message: "Cập nhật danh mục sản phẩm thành công !",
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}

// [DELETE] /api/v1/product-category/delete/:id
module.exports.delete = async (req, res) => {
  try {
    // Lưu thông tin người xóa
    const infoDelete = {
      account_id: req.user.id,
      deletedAt: new Date()
    }
    // Xóa mềm
    await ProductCategory.updateOne(
      { _id: req.params.id },
      {
        deleted: true,
        deletedBy: infoDelete
      }
    )
    res.json({
      success: true,
      status: 200,
      message: "Xóa danh mục sản phẩm thành công !",
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}