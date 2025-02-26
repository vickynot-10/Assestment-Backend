import { ProductModel } from "../Models/Products.js";
export const VendorIndividualProducts = async (req, res) => {
  try {
    let vendorID = req.params.id;
    let db = await ProductModel.find({ProductOwner : vendorID});
    console.log(db);
    if(!db){
        return res.status(400).send("Error occured Try again");
    }
    if(db.length === 0){
        return res.status(400).send("0 Products found");
    }
    return res.status(200).json({
        isFound : true,
        data : db
    })

  } catch (e) {
    console.error("Error:", e);
    return res.status(500).send("Server Error");
  }
};
