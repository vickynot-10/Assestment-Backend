import mongoose from "mongoose"
import {configDotenv} from 'dotenv'
export default async function getDataBase(){
    configDotenv()
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connect")
    }catch(e){
        console.log(e)
    }
}