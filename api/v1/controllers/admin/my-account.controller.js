const Account = require('../../models/account.model');

module.exports.index = async (req, res) => {
  res.json({
    success: true,
    status: 200,
    message: "Lấy dữ liệu thành công !",
    data: req.user,
  });
}