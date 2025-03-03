import jwt from 'jsonwebtoken';
import { UserModel } from '../Models/Users.js';
import { configDotenv } from "dotenv";
configDotenv()
export const verifyJWTtoken = (req, res, next) => {

    let token = req.cookies.token;

    if (!token) {
        return res.status(400).json({
            message: "Please Login , Have token",
            isLoggedIn: false,
            userdata: null
        })
    }
    try {
        jwt.verify(token, process.env.SECRET_KEY, async(err, decode) => {
            if (err) {
                return res.status(400).json({
                    message: "Error at token",
                    isLoggedIn: false,
                    userdata: null
                })
            }
            let user = await UserModel.findById(decode.userID);
            if (!user) {
                return res.status(400).json({
                    isLoggedIn: false,
                    userdata: "User cant found"
                })
            }
            req.user = user
            next()
        })
    } catch (e) {

        return res.status(400).json({
            isLoggedIn: false,
            userdata: "User cant found"
        })
    }
}