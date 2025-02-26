import { UserModel } from "../Models/Users.js";
import bcrypt from "bcryptjs";

export const StaffAccSignUp = async(req,res)=>{
   
    try{

        const { name , email , password , assignedvendor } = req.body
        if(!name){
            return res.status(400).send("Please Enter Name");
        }
        if(!email){
            return res.status(400).send("Please Enter E-Mail");
        }
        if(!password){
            return res.status(400).send("Please Enter Pasword");
        }

        const vendorExists = await UserModel.findOne({_id :assignedvendor , role : "vendor" });
        if(!vendorExists){
            return res.status(500).send("Vendor Profile not found");
        }

        const userMailFind = await UserModel.findOne( { email : email , role : "staff" } , {email : 1} );
        if(userMailFind){
            return res.status(400).send("User with mail already exists")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        let db =  new UserModel({
            username : name,
            email : email,
            password : hashedPassword,
            role : "staff",
            assignedVendor : assignedvendor
        })
        if(!db){
            return res.status(500).send("Error occured , Try again");
        }
        await db.save();
        return res.status(200).json({
            isCreated : true , msg : "Successfully create"
        })
    }
    catch(e){
        console.error("Error:", e);
        return res.status(500).send("Server Error")
    }
}