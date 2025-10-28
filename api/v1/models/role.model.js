const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  { 
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    permissions: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['active', 'inactive'], 
      default: 'active'
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
    deleted: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  }
);

const Role = mongoose.model('Role', roleSchema, "roles");

module.exports = Role;