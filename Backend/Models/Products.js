import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  ProductImg :{
    type : String
  },
  ProductOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  ProductName: {
    type: String,
    required: true,
  },
  ProductDesc: {
    type: String,
  },
  ProductCategory: {
    type: String,
  },
  ProductOldPrice: {
    type: Number,
  },
  ProductNewPrice: {
    type: Number,
  },
  freeDelivery: {
    type: Boolean,
    default: false,
  },
  deliveryFee: {
    type: Number,
    default: 0,
  },
  productStartdate: {
    type: Date,
  },
  expirydate: {
    type: Date,
  },
  discountAmt: {
    type: Number,
  },

  discountPercentage: {
    type: Number,
  },
});

ProductSchema.pre("save", function (next) {
  this.expirydate = new Date(this.productStartdate);
  this.expirydate.setDate(this.expirydate.getDate() + 7);
  const oldprice = this.ProductOldPrice || 0;
  const newPrice = this.ProductNewPrice || 0;

  if (oldprice > newPrice) {
    this.discountAmt = oldprice - newPrice;
    this.discountPercentage = parseFloat(
      ((this.discountAmt / this.ProductOldPrice) * 100).toFixed(2)
    );
  } else {
    this.discountAmt = 0;
    this.discountPercentage = 0;
  }

  next();
});

export const ProductModel = mongoose.model("Products", ProductSchema);
