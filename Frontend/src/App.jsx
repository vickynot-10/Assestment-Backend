import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Users/Home";

import VendorLogin from "./Components/Vendor/vendorLogin";
import VendorHome from "./Components/Vendor/vendorHome";
import VendorAdd from "./Components/Vendor/vendorAdd";
import ViewProducts from "./Components/Vendor/VendorView";
import SeparateProduct from "./Components/Vendor/Separeproduct";
import SeparateProductUsers from "./Components/Users/ViewSeparateProduct";

import AdminLogin from "./Components/Admin/AdminLogin";
import AdminHome from "./Components/Admin/AdminHome";
import ViewStaffs from "./Components/Admin/ViewStaffs";
import ViewUsers from "./Components/Admin/ViewUsers";
import ViewVendors from "./Components/Admin/ViewVendors";

import AddStaffAccount from "./Components/Admin/AddStaffAccount";
import AdminAddProduct from "./Components/Admin/AdminAddProduct";
import ViewVendorProducts from "./Components/Admin/ViewVendorProducts";

import { UserContextProvider } from "./Contexts/UserLogin";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Stafflogin from "./Components/Staff/StaffLogin";
import { AdminRoute } from "./Components/Routes/Admin";
import StaffHome from "./Components/Staff/StaffHome";
import { VendorRoute } from "./Components/Routes/Vendor";
import { StaffRoute } from "./Components/Routes/Staff";
import StaffAddProduct from "./Components/Staff/StaffAddProduct";

function App() {

  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/view-product/:id"
              element={<SeparateProductUsers />}
            />

            <Route path="/vendor" element={<VendorLogin />} />

            <Route
              path="/vendor/home"
              element={<VendorRoute element={<VendorHome />} />}
            />
            <Route
              path="/vendor/add"
              element={<VendorRoute element={<VendorAdd />} />}
            />
            <Route
              path="/vendor/view"
              element={<VendorRoute element={<ViewProducts />} />}
            />
            <Route
              path="/product/view/:id"
              element={<VendorRoute element={<SeparateProduct />} />}
            />

            <Route path="/admin" element={<AdminLogin />} />

            <Route
              path="/admin/home"
              element={<AdminRoute element={<AdminHome />} />}
            />
            <Route
              path="/admin/view/users"
              element={<AdminRoute element={<ViewUsers />} />}
            />
            <Route
              path="/admin/view/staffs"
              element={<AdminRoute element={<ViewStaffs />} />}
            />
            <Route
              path="/admin/view/vendors"
              element={<AdminRoute element={<ViewVendors />} />}
            />
            <Route
              path="/admin/view/add-product"
              element={<AdminRoute element={<AdminAddProduct />} />}
            />
            <Route
              path="/admin/view/add_staff"
              element={<AdminRoute element={<AddStaffAccount />} />}
            />

            <Route
              path="/admin/view/vendor/:id"
              element={<AdminRoute element={<ViewVendorProducts />} />}
            />
            <Route path="/staff" element={<Stafflogin />} />
            <Route
              path="/staff/home"
              element={<StaffRoute element={<StaffHome />} />}
            />

            <Route
              path="/staff/add-product"
              element={<StaffRoute element={<StaffAddProduct />} />}
            />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
