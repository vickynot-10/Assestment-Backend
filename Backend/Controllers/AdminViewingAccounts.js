import { UserModel } from "../Models/Users.js";

export const ViewAllUsers = async (req, res) => {
  try {
    let db = await UserModel.find({ role: "user" });
    if (!db) {
      return res.status(400).send("Error Occured Try Again");
    }
    if (db.length <= 0) {
      return res.status(400).send("0 profiles found");
    }
    return res.status(200).json({
      isFound: true,
      data: db,
    });
  } catch (e) {
    console.error(" Error:", e);
    return res.status(500).send("Server Error");
  }
};

export const ViewAllStaffs = async (req, res) => {
  try {
    let db = await UserModel.find({ role: "staff" });
    if (!db) {
      return res.status(400).send("Error Occured Try Again");
    }
    if (db.length <= 0) {
      return res.status(400).send("0 profiles found");
    }
    return res.status(200).json({
      isFound: true,
      data: db,
    });
  } catch (e) {
    console.error(" Error:", e);
    return res.status(500).send("Server Error");
  }
};

export const ViewAllVendors = async (req, res) => {
  try {
    let db = await UserModel.find({ role: "vendor" });
    if (!db) {
      return res.status(400).send("Error Occured Try Again");
    }
    if (db.length <= 0) {
      return res.status(400).send("0 profiles found");
    }
    return res.status(200).json({
      isFound: true,
      data: db,
    });
  } catch (e) {
    console.error(" Error:", e);
    return res.status(500).send("Server Error");
  }
};
