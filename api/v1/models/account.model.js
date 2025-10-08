const mongoose = require("mongoose");
const generate = require("../../../helpers/generate.helper");

const accountSchema = new mongoose.Schema(
  { 
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: () => generate.generateRandomString(30)
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    },
    deletedBy: {
      account_id: String,
      deletedAt: Date
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date
      }
    ],
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false
    },
  }, {
    timestamps: true
  }
);

const Account = mongoose.model('Account', accountSchema, "accounts");

module.exports = Account;