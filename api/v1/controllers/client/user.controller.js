const User = require('../../models/user.model');
const sendErrorHelper = require('../../../../helpers/sendError.helper');
const md5 = require("md5");

// [POST] /api/v1/users/login
module.exports.login = async (req, res) => {
  try {
    // Kiểm tra email 
    const accountUser = await User.findOne({ email: req.body.email, deleted: false });
    if(!accountUser){
      return sendErrorHelper.sendError(res, 400, "email không tồn tại !", "Lỗi server");
    }
    // Có email thì kiểm tra password tương ứng
    if(accountUser.password !== md5(req.body.password)){
      return sendErrorHelper.sendError(res, 400, "password không đúng !", "Lỗi server");
    }
    const { password, ...userData } = accountUser._doc;
    res.json({
      success: true,
      status: 200,
      message: "Đăng nhập thành công !",
      token: accountUser.tokenUser,
      user: userData
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
}

// [POST] /api/v1/users/register
module.exports.register = async (req, res) => {
  try {
    // Kiểm tra email đã tồn tại hay chưa
    const exitEmail = await User.findOne({ deleted: false, email: req.body.email });
    if(exitEmail){
      return sendErrorHelper.sendError(res, 400, "Email đã tồn tại", "Email đã tồn tại");
      // return để tránh gửi nhiều phản hồi trong 1 request
    }
    // Nếu không tồn tại thì mã hóa mật khẩu và lưu vào database
    req.body.password = md5(req.body.password);
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    const { password, ...userData } = user._doc;
    res.json({
      success: true,
      status: 200,
      message: "Đăng ký thành công !",
      token: user.tokenUser,
      user: userData
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Không thể tạo tài khoản! Hãy thử lại", error.message);
  }
}