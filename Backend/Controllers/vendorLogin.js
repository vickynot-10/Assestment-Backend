import { UserModel } from "../Models/Users.js";
import bcrypt from "bcryptjs";
import { generateJWTtoken } from "../utils/generateJWTtoken.js";

export const VendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email) {
      return res.status(400).send("Please Enter Mail");
    }

    if (!password) {
      return res.status(400).send("Please Enter Pasword");
    }
    let userFind = await UserModel.findOne({ email: email , role : "vendor" });
    if (!userFind) {
      return res.status(400).send("Cant find an user");
    }
    const passwordMatch = await bcrypt.compare(password, userFind.password);
    if (!passwordMatch) {
      return res.status(400).send("Password is wrong");
    }
    let token = generateJWTtoken(userFind);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });
    console.log("toekn generated",token);
    return res.status(200).json({
      isLogin: true,
      username : userFind.username,
      role : userFind.role,
      id : userFind._id,
      msg: "Login successful"
    });
  } catch (e) {
    console.error("login Error:", e);
    return res.status(500).send("Server Error");
  }
};
