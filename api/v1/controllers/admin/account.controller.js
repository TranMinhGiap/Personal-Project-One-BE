const Account = require('../../models/account.model');
const sendErrorHelper = require('../../../../helpers/sendError.helper');
const paginationHelper = require("../../../../helpers/objectPagination.helper");
const searchHelper = require("../../../../helpers/search");
const userLogHelper = require('../../../../helpers/attachUserLog');

// [GET] /apt/v1/admin/accounts
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
      sort["createdBy.createdAt"] = "desc";
    }
    // Pagination
    const countDocument = await Account.countDocuments(condition);
    const objectPagination = paginationHelper.objectPagination(req.query, countDocument)
    const records = await Account.find(condition)
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

// [GET] /apt/v1/admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Account.findOne({ _id: id, deleted: false }).select("-password").lean();
    if (!record) {
      return sendErrorHelper.sendError(res, 400, "Không tìm thấy tài khoản", error.message);
    }
    // Có tài khoản thì gán thêm 1 số thông tin (User thêm sửa xóa)
    const newRecord = await userLogHelper(record);
    res.json({
      success: true,
      status: 200,
      message: "Lấy dữ liệu thành công !",
      data: newRecord,
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}