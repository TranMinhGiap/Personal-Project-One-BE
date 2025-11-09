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

// [PATCH] /api/v1/admin/products/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    // Lưu thong tin người cập nhật
    const updatedBy = {
      account_id: req.user.id,
      updatedAt: new Date()
    };
    // Cập nhật
    await Product.updateOne(
      { _id: req.params.id },
      {
        status: req.body.status,
        $push: { updatedBy: updatedBy }
      }
    )
    res.json({
      success: true,
      status: 200,
      message: "Cập nhật trạng thái sản phẩm thành công !",
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}

// [PATCH] /api/v1/admin/products/change-position/:id
module.exports.changePosition = async (req, res) => {
  try {
    // convert vị trí thành số trong trường hợp là string
    req.body.position = parseInt(req.body.position);
    // Lưu thong tin người cập nhật
    const updatedBy = {
      account_id: req.user.id,
      updatedAt: new Date()
    };
    // Cập nhật
    await Product.updateOne(
      { _id: req.params.id },
      {
        position: req.body.position,
        $push: { updatedBy: updatedBy }
      }
    )
    res.json({
      success: true,
      status: 200,
      message: "Cập nhật vị trí sản phẩm thành công !",
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}

// [PATCH] /api/v1/admin/products/change-featured/:id
module.exports.changeFeatured = async (req, res) => {
  try {
    // Lưu thong tin người cập nhật
    const updatedBy = {
      account_id: req.user.id,
      updatedAt: new Date()
    };
    // Cập nhật
    await Product.updateOne(
      { _id: req.params.id },
      {
        featured: req.body.featured,
        $push: { updatedBy: updatedBy }
      }
    )
    res.json({
      success: true,
      status: 200,
      message: "Cập nhật trạng thái sản phẩm thành công !",
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}

// [PATCH] /api/v1/admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const type = req.body.type;
    const ids = req.body.ids;
    // Lưu thong tin người cập nhật
    const updatedBy = {
      account_id: req.user.id,
      updatedAt: new Date()
    };
    // Cập nhật
    switch (type) {
      case "active":
        await Product.updateMany({ _id: { $in : ids } }, {
          status: "active",
          $push: { updatedBy: updatedBy }
        });
        break;
      case "inactive":
        await Product.updateMany({ _id: { $in : ids } }, {
          status: "inactive",
          $push: { updatedBy: updatedBy }
        });
        break;
      case "deleted-all":
        await Product.updateMany({ _id: { $in : ids } }, {
          deleted: true,
          $push: { updatedBy: updatedBy }
        });
        break;
      case "isFeatured":
        await Product.updateMany({ _id: { $in : ids } }, {
          featured: true,
          $push: { updatedBy: updatedBy }
        });
        break;
      case "notFeatured":
        await Product.updateMany({ _id: { $in : ids } }, {
          featured: false,
          $push: { updatedBy: updatedBy }
        });
        break;
      default:
        break;
    }
    res.json({
      success: true,
      status: 200,
      message: "Cập nhật trạng thái sản phẩm thành công !",
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}