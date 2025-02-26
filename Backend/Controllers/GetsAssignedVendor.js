import { ProductModel } from "../Models/Products.js";
import mongoose from "mongoose";
export const GetVendorForStaff = async(req,res)=>{
    try{
        let vendorId = req.params.id
        if(!vendorId || vendorId === null){
            return res.status(400).send("Error occured try again");
        }
        let vendorFind = await ProductModel.find({ProductOwner :new mongoose.Types.ObjectId(vendorId)});
        console.log(vendorFind)

        if(vendorFind.length === 0){
            return res.status(400).send("No products Made");
        }
        return res.status(200).json({
            isFound : true , data : vendorFind
        })

    }catch(e){
        console.error("Error:", e);
        return res.status(500).send("Server Error")
    }
}