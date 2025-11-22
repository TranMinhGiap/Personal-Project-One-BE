const ProductVariant = require('../../models/product-variant.model');
const sendErrorHelper = require('../../../../helpers/sendError.helper');

// [PATCH] /api/v1/admin/variants/bulk-update
module.exports.edit = async (req, res) => {
  try {
    const payload = req.body;

    const updatedBy = {
      account_id: req.user.id,
      updatedAt: new Date(),
    };

    const ops = payload.map(v => {
      const { _id, ...updates } = v;
      return {
        updateOne: {
          filter: { _id },
          update: {
            $set: updates,
            $push: { updatedBy: updatedBy }
          }
        }
      };
    });

    await ProductVariant.bulkWrite(ops);

    res.json({
      success: true,
      status: 200,
      message: "Cập nhật biến thể thành công !",
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
};

// [DELETE] /api/v1/admin/variants/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const infoDelete = {
      account_id: req.user.id,
      deletedAt: new Date()
    }

    await ProductVariant.updateOne({ _id: id }, { deleted: true, deletedBy: infoDelete });

    res.json({
      success: true,
      status: 200,
      message: "Xóa biến thể sản phẩm thành công !",
    });
  } catch (error) {
    sendErrorHelper.sendError(res, 500, "Lỗi server", error.message);
  }
};

