const sendErrorHelper = require("../../../../helpers/sendError.helper");
const Account = require("../../models/account.model");

module.exports.requireAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return sendErrorHelper.sendError(res, 401, "Unauthorized", "Chưa có token!");
    }

    // Giả sử format "Bearer <token>", lấy token ở index 1
    const tokenUser = req.headers.authorization.split(" ")[1];
    
    if (!tokenUser) {
      return sendErrorHelper.sendError(res, 401, "Unauthorized", "Token không hợp lệ!");
    }

    // Kiểm tra token hợp lệ
    const user = await Account.findOne({ 
      token: tokenUser, 
      deleted: false, 
      status: "active" 
    }).select("-password"); 

    if (!user) {
      return sendErrorHelper.sendError(res, 401, "Không có thông tin tài khoản!", "Token không hợp lệ!");
    }

    // Lưu thông tin user vào req để middleware/controller sau dùng
    req.user = user;
    next();
  } catch (error) {
    return sendErrorHelper.sendError(res, 500, "Internal Server Error", "Lỗi server nội bộ!");
  }
};