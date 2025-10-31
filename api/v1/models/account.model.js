const mongoose = require("mongoose");
const generate = require("../../../helpers/generate.helper");

const accountSchema = new mongoose.Schema(
  { 
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    hometown: {
      type: String,
      default: "",
      trim: true
    },
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
      type: {
        account_id: String,
        deletedAt: Date
      },
      default: null
    },
    updatedBy: {
      type: [
        {
          account_id: String,
          updatedAt: {
            type: Date,
            default: Date.now
          }
        }
      ],
      default: []
    },
    phone: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    },
    role_id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive'], 
      default: 'active'
    },
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