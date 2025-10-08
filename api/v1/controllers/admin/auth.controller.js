const Account = require('../../models/account.model');
const sendErrorHelper = require('../../../../helpers/sendError.helper');
const md5 = require('md5');

// [POST] api/v1/admin/auth/login
module.exports.loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await Account.findOne({ deleted: false, email: email });
    if (!account) {
      return sendErrorHelper.sendError(res, 400, "Tài khoản không tồn tại !", `Chưa có tài khoản với email ${email} !`);
    }
    if (account.password !== md5(password)) {
      return sendErrorHelper.sendError(res, 400, "Mật khẩu không đúng !", "Mật khẩu không đúng !");
    }
    if (account.status === "inactive") {
      return sendErrorHelper.sendError(res, 400, "Tài khoản đã bị khóa !", "Tài khoản đang bị khóa !");
    }
    res.json({
      success: true,
      status: 200,
      message: "Đăng nhập thành công !",
      token: account.token,
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}