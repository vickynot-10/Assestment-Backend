import { UserModel } from "../Models/Users.js";
import bcrypt from "bcryptjs";

export const VendorSignUp = async(req,res)=>{
    try{
        const { name , email , password } = req.body
        if(!name){
            return res.status(400).send("Please Enter Name");
        }
        if(!email){
            return res.status(400).send("Please Enter E-Mail");
        }
        if(!password){
            return res.status(400).send("Please Enter Pasword");
        }
        const userMailFind = await UserModel.findOne( { email : email , role : "vendor" } , {email : 1} );
        if(userMailFind){
            return res.status(400).send("User with mail already exists")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        let db =  new UserModel({
            username : name,
            email : email,
            password : hashedPassword,
            role : "vendor"
        })
        if(!db){
            return res.status(500).send("Error occured , Try again");
        }
        await db.save();
        return res.status(200).send("Successfully created");
    }
    catch(e){
        console.error("Signup Error:", e);
        return res.status(500).send("Server Error")
    }
}