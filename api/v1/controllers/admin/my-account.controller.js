const Account = require('../../models/account.model');
const Role = require('../../models/role.model');
const sendErrorHelper = require('../../../../helpers/sendError.helper');

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
  res.json({
    success: true,
    status: 200,
    message: "Lấy dữ liệu thành công !",
    data: req.user,
  });
}