const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productVariantSchema = new mongoose.Schema(
  { 
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",  
      required: true
    },
    price: { 
      type: Number, 
      required: true,
      default: 0
    },
    discountPercentage: { 
      type: Number, 
      default: 0
    },
    stock: { 
      type: Number,
      required: true,
      default: 0 
    },
    visits: { 
      type: Number,
      default: 0 
    },
    storage: { 
      type: String, 
      required: true
    },
    color: { 
      type: String,
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
    images: {
      type: [String],
      default: []
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
    deletedBy: {
      account_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Account" 
      },
      deletedAt: Date
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
    slug: { type: String, slug: "color", unique: true }
  }, {
    timestamps: true
  }
);

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema, "products-variant");

module.exports = ProductVariant;