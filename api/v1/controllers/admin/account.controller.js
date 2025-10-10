const Account = require('../../models/account.model');
const sendErrorHelper = require('../../../../helpers/sendError.helper');

// [GET] /apt/v1/admin/accounts
module.exports.index = async (req, res) => {
  try {
    const condition = {
      deleted: false
    }
    const records = await Account.find(condition).select("-password");
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

// [GET] /apt/v1/admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = {
      _id: id,
      deleted: false
    }
    const records = await Account.findOne(condition).select("-password");
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