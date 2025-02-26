import mongoose from "mongoose";
import { ProductModel } from "../Models/Products.js";

export const AddProductStaff = async (req, res) => {
  const vendorId = req.params.id;
  if (vendorId === null || !vendorId) {
    return res.status(400).send("Please Try again , error occured");
  }
  function checkingVarUndefined(str) {
    if (!str || str.length === 0) {
      return null;
    }
    return str;
  }
  console.log(vendorId);

  try {
    const imgName = req.file ? req.file.filename : null;
    const {
      productname,
      description,
      category,
      oldprice,
      newprice,
      freedelivery,
      deliveryfee,
      productstartDate,
    } = req.body;

    if (!productname) {
      return res.status(400).send("Please Enter product name 1");
    }
    if (!newprice) {
      return res.status(400).send("Please Enter product new price");
    }
    if (!oldprice) {
      return res.status(400).send("Please Enter product old price");
    }
    if (!productstartDate) {
      return res.status(400).send("Please Enter product Start Date");
    }
    let db = new ProductModel({
      ProductOwner: new mongoose.Types.ObjectId(vendorId),
      ProductName: productname,
      ProductDesc: checkingVarUndefined(description),
      ProductCategory: checkingVarUndefined(category),
      ProductOldPrice: checkingVarUndefined(oldprice),
      ProductNewPrice: newprice,
      freeDelivery: freedelivery,
      deliveryFee: freedelivery ? 0 : deliveryfee,
      ProductImg: imgName,
      productStartdate: productstartDate,
    });
    await db.save();
    console.log(db);
    return res.status(200).json({
      isAdded: true,
      msg: "Product Added Succesfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Server Error");
  }
};
