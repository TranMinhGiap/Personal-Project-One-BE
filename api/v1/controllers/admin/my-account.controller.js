const Account = require('../../models/account.model');
const Role = require('../../models/role.model');
const sendErrorHelper = require('../../../../helpers/sendError.helper');
const md5 = require('md5');
const userLogHelper = require('../../../../helpers/attachUserLog');

module.exports.index = async (req, res) => {
  // Gan thông tin role
  if (req.user.role_id) {
    try {
      const role = await Role.findOne({ _id: req.user.role_id, status: "active", deleted: false }).lean().select("title");
      req.user = {
        ...req.user.toObject?.() || req.user,
        roleInfo: role || null
      };
    } catch (error) {
      return sendErrorHelper.sendError(res, 500, "Không lấy được thông tin phân quyền", error.message);
    }
  }
  // Có tài khoản thì gán thêm 1 số thông tin (User thêm sửa xóa)
  const newRecord = await userLogHelper({...req.user.toObject?.() || req.user});
  res.json({
    success: true,
    status: 200,
    message: "Lấy dữ liệu thành công !",
    data: newRecord,
  });
}

// [PATCH] /api/v1/admin/my-accounts/edit
module.exports.edit = async (req, res) => {
  try {
    // Kiểm tra xem tài khoản có tồn tại không
    const exitAccount = await Account.findOne({ _id: req.user.id, deleted: false, status: "active" });
    if (!exitAccount) {
      return sendErrorHelper.sendError(res, 400, "Tài khoản không tồn tại !");
    }
    // Cập nhật mật khẩu nếu có thay đổi
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } 
    // Lưu thông tin người cập nhật
    const updatedBy = {
      account_id: req.user.id,
      updatedAt: new Date()
    };
    // Cập nhật
    await Account.updateOne(
      { _id: req.user.id },
      {
        $set: { ...req.body },
        $push: { updatedBy: updatedBy }
      }
    )
    res.json({
      success: true,
      status: 200,
      message: "Cập nhật tài khoản thành công !",
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}