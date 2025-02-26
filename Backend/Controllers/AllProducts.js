import { ProductModel } from "../Models/Products.js";

export const GetAllproducts = async (req, res) => {
  try {
    let {page} = req.query;
    let limit = 6;
    let pageNumber = Number(page);

    let db = await ProductModel.find({}).populate("ProductOwner", "username") .skip((pageNumber - 1) * limit).limit(limit);
    if(!db){
        return res.status(400).send("An error occured try again");
    }
    let totalDocs = await ProductModel.countDocuments();
    const totalPages =  Math.ceil(totalDocs / limit);

    return res.status(200).json({
        isFound : true , TotalPages : totalPages , productData : db
    })

} catch (e) {
    console.error("Login Error:", e);
    return res.status(500).send("Server Error");
  }
};
