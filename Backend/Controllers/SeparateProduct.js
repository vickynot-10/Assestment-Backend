import { ProductModel } from "../Models/Products.js";
import { UserModel } from "../Models/Users.js";

export const ViewSeparateProduct = async(req,res)=>{
    try{
        let id = req.params.id
        if(!id || id === null){
            return res.status(400).send("Error occured Try again");
        }

        let db = await ProductModel.findOne({_id : id});
        if(!id){
            return res.status(400).send("Error occured Try again");
        }
        let ownerName = await UserModel.findOne({_id : db.ProductOwner} , {username : 1 , _id: 0} );
        return res.status(200).json({
            isFound : true , data : db , owner: ownerName?.username
        })

    } catch (e) {
    console.error("Login Error:", e);
    return res.status(500).send("Server Error");
  }
}