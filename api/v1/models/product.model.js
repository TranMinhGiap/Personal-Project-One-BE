const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  { 
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true
    },
    createdBy: {
      account_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Account" 
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    },
    description: {
      type: String,
      default: ""
    },
    detail: {
      type: String,
      default: ""
    },
    thumbnail: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['active', 'inactive'], 
      default: 'active'
    },
    position: Number,
    deleted: {
      type: Boolean,
      default: false
    },
    featured: {
      type: Boolean,
      default: false
    },
    deletedBy: {
      type: {
        account_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Account"
        },
        deletedAt: Date
      },
      default: null
    },
    updatedBy: [
      {
        account_id: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Account" 
        },
        updatedAt: Date
      }
    ],
    slug: { type: String, slug: "title", unique: true }
  }, {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;