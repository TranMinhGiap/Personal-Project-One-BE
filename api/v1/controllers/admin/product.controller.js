const Product = require('../../models/product.model');
const ProductVariant = require('../../models/product-variant.model');
const sendErrorHelper = require('../../../../helpers/sendError.helper');
const paginationHelper = require("../../../../helpers/objectPagination.helper");
const searchHelper = require("../../../../helpers/search");
const mongoose = require("mongoose");

// [GET] /api/v1/admin/products
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
    if (sortKey && sortValue) {
      sort[sortKey] = sortValue;
    } else {
      sort.position = "asc";
    }
    // Pagination
    const countDocument = await Product.countDocuments(condition);
    const objectPagination = paginationHelper.objectPagination(req.query, countDocument)
    const records = await Product.find(condition)
      .skip(objectPagination.skip)
      .limit(objectPagination.limit)
      .sort(sort)
      .populate("category_id", "title")
      .lean();
    // Variant dựa trên id
    const productIds = records.map(p => p._id);
    const variantStats = await ProductVariant.aggregate([
      { $match: { product_id: { $in: productIds }, deleted: false } },
      {
        $group: {
          _id: "$product_id",
          variantCount: { $sum: 1 },
          totalStock: { $sum: "$stock" }
        }
      }
    ]);
    // Merge thông tin
    const statsMap = Object.fromEntries(
      variantStats.map(v => [v._id.toString(), v])
    );

    const newRecords = records.map(p => {
      const stats = statsMap[p._id.toString()];
      return {
        ...p,
        variantCount: stats?.variantCount || 0,
        totalStock: stats?.totalStock || 0
      };
    });
    res.json({
      success: true,
      status: 200,
      message: "Lấy dữ liệu thành công !",
      data: newRecords,
      pagination: objectPagination
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}

// [POST] /api/v1/admin/products/create
module.exports.create = async (req, res) => {
  const { variants, ...productGeneral } = req.body;
  try {
    // Nếu không có vị trí => tự động tăng theo số lượng bản khi. Ngược lại có vị trí => Chuyển dạng số và giữ nguyên vị trí
    if (!productGeneral.position) {
      const count = await Product.countDocuments();
      productGeneral.position = count + 1;
    } else {
      productGeneral.position = parseInt(productGeneral.position);
    }
    // Lưu thông tin người tạo (thông tin đã có khi chạy qua middleware auth)
    productGeneral.createdBy = {
      account_id: req.user.id
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    const record = new Product(productGeneral);
    try {
      await record.save({ session });

      // Kiểm tra biến thể
      await Promise.all(
        (variants || []).map(v => {
          const variant = new ProductVariant({
            ...v,
            product_id: record._id,
            createdBy: { account_id: req.user.id }
          });
          return variant.save({ session });
        })
      );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
    
    res.json({
      success: true,
      status: 200,
      message: "Thêm sản phẩm thành công !",
      data: record
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}