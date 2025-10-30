const Account = require('../../models/account.model');
const Role = require('../../models/role.model');
const sendErrorHelper = require('../../../../helpers/sendError.helper');
const paginationHelper = require("../../../../helpers/objectPagination.helper");
const searchHelper = require("../../../../helpers/search");
const userLogHelper = require('../../../../helpers/attachUserLog');
const md5 = require('md5');

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
      condition.fullName = regKeyword;
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
      .sort(sort)
      .lean();
    for(let record of records){
      // Gán thông tin role
      if(record.role_id){
        const role = await Role.findOne({ _id: record.role_id, status: "active", deleted: false }).lean();
        if(role){
          record.roleInfo = role;
        }
        else{
          record.roleInfo = null;
        }
      }
    }
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

// [POST] /api/v1/admin/accounts/create
module.exports.create = async (req, res) => {
  try {
    // Kiểm tra xem email tồn tại
    const emailExit = await Account.findOne({
      email: req.body.email,
      deleted: false
    });
    if(emailExit){
      return sendErrorHelper.sendError(res, 400, "Email đã tồn tại trong hệ thống !");
    }
    // Mã hóa mật khẩu khi email thỏa mãn
    req.body.password = md5(req.body.password);
    // Lưu thông tin người tạo (thông tin đã có khi chạy qua middleware auth)
    req.body.createdBy = {
      account_id: req.user.id
    }
    const record = new Account(req.body);
    await record.save();
    res.json({
      success: true,
      status: 200,
      message: "Thêm tài khoản thành công !",
      data: record
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Có lỗi khi thêm mới tài khoản", error.message);
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