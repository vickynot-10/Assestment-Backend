import express from "express";
import { UserSignUp } from "../Controllers/UsersSignup.js";
import { UserLogin } from "../Controllers/UsersLogin.js";
import { VendorLogin } from "../Controllers/vendorLogin.js";
import { VendorSignUp } from "../Controllers/VendorSignUp.js";
import { LoginAuthUser } from "../Controllers/VendorAuth.js";
import { verifyJWTtoken } from "../Middlewares/jwtAuth.js";
import { AddProductVendor } from "../Controllers/AddProduct.js";
import { productCheckUser } from "../Middlewares/ProductChecking.js";
import { ViewProducts } from "../Controllers/ViewProducts.js";
import { ViewSeparateProduct } from "../Controllers/SeparateProduct.js";
import { ViewSeparateProductUsers } from "../Controllers/ViewSeparateProductUser.js";
import { GetAllproducts } from "../Controllers/AllProducts.js";
import { AdminLogin } from "../Controllers/AdminLogin.js";
import { upload } from "../Middlewares/imgUpload.js";
import { AddProductAdmin } from "../Controllers/AdminAddProduct.js";
import { VendorIndividualProducts } from "../Controllers/VendorIndividualProducts.js";
import { StaffAccSignUp } from "../Controllers/AddStaffAcc.js";
import { StaffLogin } from "../Controllers/StaffLogin.js";
import { GetVendorForStaff } from "../Controllers/GetsAssignedVendor.js";
import {
  ViewAllUsers,
  ViewAllStaffs,
  ViewAllVendors,
} from "../Controllers/AdminViewingAccounts.js";

import { AddProductStaff } from "../Controllers/AddproductStaff.js";

import { AdminUserCheck } from "../Middlewares/AdminCheck.js";
import bodyParser from "body-parser";
import cors from "cors";
import { SearchBox } from "../Controllers/SearchBox.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const routes = express.Router();

routes.post("/register", UserSignUp);
routes.post("/Login", UserLogin);

routes.get("/get-product", GetAllproducts);

routes.post("/vendor/Login", VendorLogin);
routes.post("/vendor/SignUp", VendorSignUp);

routes.post(
  "/add-product",
  verifyJWTtoken,
  productCheckUser,
  upload.single("productimg"),
  AddProductVendor
);
routes.get("/view-product", verifyJWTtoken, productCheckUser, ViewProducts);
routes.get(
  "/get-product/view/:id",
  verifyJWTtoken,
  productCheckUser,
  ViewSeparateProduct
);

routes.get("/get-product/users/view/:id", ViewSeparateProductUsers);

routes.post("/admin/login", AdminLogin);

routes.get("/admin/get-users", verifyJWTtoken, AdminUserCheck, ViewAllUsers);
routes.get(
  "/admin/get-vendors",
  verifyJWTtoken,
  AdminUserCheck,
  ViewAllVendors
);
routes.get("/admin/get-staffs", verifyJWTtoken, AdminUserCheck, ViewAllStaffs);

routes.post("/add-staff-acc", StaffAccSignUp);
routes.get(
  "/admin/get-product-vendor/:id",
  verifyJWTtoken,
  AdminUserCheck,
  VendorIndividualProducts
);
routes.post(
  "/admin/add-product",
  verifyJWTtoken,
  AdminUserCheck,
  upload.single("productimg"),
  AddProductAdmin
);

routes.get("/user/me", verifyJWTtoken, LoginAuthUser);

routes.post("/staff/login", StaffLogin);
routes.get(
  "/staff/vendors/:id",
  verifyJWTtoken,
  productCheckUser,
  GetVendorForStaff
);
routes.post(
  "/staff/add-product/:id",
  verifyJWTtoken,
  productCheckUser,
  upload.single("productimg"),
  AddProductStaff
);

routes.get('/search',SearchBox);

export default routes;
