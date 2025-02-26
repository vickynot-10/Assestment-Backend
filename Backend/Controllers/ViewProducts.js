import { ProductModel } from "../Models/Products.js";

export const ViewProducts = async(req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).send("Login Again");
    }
    let productdb = await ProductModel.find({ ProductOwner: req.user._id });
    if (!productdb) {
      return res.status(400).send("0 products");
    }
    return res.status(200).json({
      isFound: true,
      data: productdb,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Server Error");
  }
};
