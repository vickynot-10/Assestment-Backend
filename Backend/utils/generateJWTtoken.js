import jwt from "jsonwebtoken";

import { configDotenv } from "dotenv";
configDotenv();

export const generateJWTtoken = (user) => {
  try {
    return jwt.sign({ userID: user._id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
