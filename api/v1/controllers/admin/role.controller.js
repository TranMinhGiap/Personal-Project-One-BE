const Role = require('../../models/role.model');
const sendErrorHelper = require('../../../../helpers/sendError.helper');
const paginationHelper = require("../../../../helpers/objectPagination.helper");
const searchHelper = require("../../../../helpers/search");
// const userLogHelper = require('../../../../helpers/attachUserLog');

// [GET] /api/v1/admin/roles
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
    }
    // Pagination
    const countDocument = await Role.countDocuments(condition);
    const objectPagination = paginationHelper.objectPagination(req.query, countDocument)
    const records = await Role.find(condition)
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

// [POST] /api/v1/admin/role/create
module.exports.create = async (req, res) => {
  try {
    // Lưu thông tin người tạo (thông tin đã có khi chạy qua middleware auth)
    req.body.createdBy = {
      account_id: req.user.id
    }
    const record = new Role(req.body);
    await record.save();
    res.json({
      success: true,
      status: 200,
      message: "Thêm nhóm quyền thành công !",
      data: record
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}

// [PATCH] /api/v1/admin/role/change-multi
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
        await Role.updateMany({ _id: { $in : ids } }, {
          status: "active",
          $push: { updatedBy: updatedBy }
        });
        break;
      case "inactive":
        await Role.updateMany({ _id: { $in : ids } }, {
          status: "inactive",
          $push: { updatedBy: updatedBy }
        });
        break;
      case "deleted-all":
        await Role.updateMany({ _id: { $in : ids } }, {
          deleted: "true",
          $push: { updatedBy: updatedBy }
        });
        break;
      default:
        break;
    }
    res.json({
      success: true,
      status: 200,
      message: "Cập nhật trạng thái nhóm quyền thành công !",
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}


// [PATCH] /api/v1/admin/roles/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    // Lưu thong tin người cập nhật
    const updatedBy = {
      account_id: req.user.id,
      updatedAt: new Date()
    };
    // Cập nhật
    await Role.updateOne(
      { _id: req.params.id },
      {
        status: req.body.status,
        $push: { updatedBy: updatedBy }
      }
    )
    res.json({
      success: true,
      status: 200,
      message: "Cập nhật trạng thái nhóm quyền thành công !",
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}