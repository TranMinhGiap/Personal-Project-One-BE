const Account = require('../api/v1/models/account.model');

module.exports = async (record) => {  
  if (!record) {
    throw new Error('Record không hợp lệ');  
  }

  try {
    // 1. Người tạo
    if (record.createdBy && record.createdBy.account_id) {
      try {
        const userCreate = await Account.findOne(
          { _id: record.createdBy.account_id, deleted: false },
          { password: 0, token: 0 }
        );
        record.userCreate = userCreate || null;
      } catch (error) {
        console.error(`[Error - Người tạo]: ${error.message}`);
        record.userCreate = null;
      }
    } else {
      record.userCreate = null;
    }

    // 2. Người xóa
    if (record.deletedBy && record.deletedBy.account_id) {
      try {
        const userDelete = await Account.findOne(
          { _id: record.deletedBy.account_id, deleted: false },
          { password: 0, token: 0 }
        );
        record.userDelete = userDelete || null;
      } catch (error) {
        console.error(`[Error - Người xóa]: ${error.message}`);
        record.userDelete = null;
      }
    } else {
      record.userDelete = null;
    }

    // 3. Người cuối cùng chỉnh sửa
    if (record.updatedBy && Array.isArray(record.updatedBy) && record.updatedBy.length > 0) { 
      try {
        const lastUpdate = record.updatedBy[record.updatedBy.length - 1];
        const id = lastUpdate?.account_id;  
        if (id) {
          const userUpdate = await Account.findOne(
            { _id: id, deleted: false },
            { password: 0, token: 0 }
          );
          record.userUpdate = userUpdate || null;  // Hoặc record.lastUserUpdate = userUpdate; nếu muốn riêng
        } else {
          record.userUpdate = null;
        }
      } catch (error) {
        console.error(`[Error - Người chỉnh sửa]: ${error.message}`);
        record.userUpdate = null;
      }
    } else {
      record.userUpdate = null;
    }

  } catch (globalError) {  
    console.error('[Lỗi lấy thông tin user liên quan đến danh mục]:', globalError);  
    throw new Error(`Lỗi hệ thống khi lấy thông tin user liên quan đến danh mục: ${globalError.message}`);  
  } finally {
    return record;  
  }
};