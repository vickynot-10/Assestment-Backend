import { ProductModel } from "../Models/Products.js";

export const SearchBox = async (req, res) => {
  try {
    let query = req.query.Searchquery;
  if(!query){
    return res.status(400).send("Search Query need");
  }
  const results = await ProductModel.find({
    $or : [
        { ProductName : {$regex : query , $options : "i"} },
        { ProductCategory: {$regex : query , $options : "i"} }
    ]
  } , { _id : 1 , ProductName : 1, ProductCategory : 1 } )
  if(results.length === 0){
    return res.status(200).send("No Products Found");
  }
  res.status(200).send({
    isFound:true , data : results
  });
  } catch (e) {
    return res.status(500).send("Server Error");
  }
};
