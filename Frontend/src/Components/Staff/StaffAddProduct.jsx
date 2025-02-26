import React, { useState } from "react";

import { useUserAuth } from "../../Contexts/UserLogin";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function StaffAddProduct() {
    
    const {isUserLoggedIn} = useUserAuth()
  const [formData, setFormData] = useState({
    productname: "",
    productImg : null ,
    description: "",
    category: "",
    oldprice: "",
    newprice: "",
    freedelivery: false,
    deliveryfee: "",
    productstartDate: ""
  });
function saveImage(e){
  const file = e.target.files[0];
  if(file){
    setFormData((prev)=>({
      ...prev,
      productImg : file
    }))
  }
}
  function handleChange(e) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  function handleRadioChange(e) {
    setFormData((prev) => ({
      ...prev,
      freedelivery: e.target.value === "true",
    }));
  }

  async function handleForm(e) {
    e.preventDefault();
    try {
      const formFinaldata = new FormData();

      Object.entries(formData).forEach(([key,val])=>{
        if(key !== "productImg"){
          formFinaldata.append(key,val)
        }
      })
      if(formData.productImg){
        formFinaldata.append("productimg",formData.productImg)
      }

      let res = await axios.post(
         `${import.meta.env.VITE_URL_BACKEND_URL}/staff/add-product/${isUserLoggedIn.userID}`,
        formFinaldata,
        {
          withCredentials: true,
        }
      );
      if (!res) {
        throw new Error("Error occured try again");
      }
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
      }}
    >
      <Typography variant="h5">Add Product</Typography>
      <Stack
        direction="row"
        sx={{ maxWidth: "100%", margin: "auto", padding: 2 }}
      >
        <form onSubmit={handleForm} content="multipart/form-data" >
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              name="img"
              onChange={saveImage}
            />
          </Button>
          { formData.productImg !== null && <p> Img uploaded </p>
           }
          <TextField
            sx={{ margin: "10px" }}
            label="Product Name"
            name="productname"
            value={formData.productname}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            sx={{ margin: "10px" }}
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            sx={{ margin: "10px" }}
          />
          <TextField
            label="Old Price"
            name="oldprice"
            type="number"
            sx={{ margin: "10px" }}
            value={formData.oldprice}
            onChange={handleChange}
          />
          <TextField
            label="New Price"
            name="newprice"
            sx={{ margin: "10px" }}
            type="number"
            value={formData.newprice}
            onChange={handleChange}
          />
          <Typography>Free Delivery:</Typography>
          <RadioGroup
            sx={{ margin: "10px" }}
            row
            value={formData.freedelivery.toString()}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
          {!formData.freedelivery && (
            <TextField
              sx={{ margin: "10px" }}
              label="Delivery Fee"
              name="deliveryfee"
              type="number"
              value={formData.deliveryfee}
              onChange={handleChange}
            />
          )}
          <Typography>Product Start Date:</Typography>
          <TextField
            sx={{ margin: "10px" }}
            name="productstartDate"
            type="date"
            value={formData.productstartDate}
            onChange={handleChange}
          />
        
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ margin: "10px" }}
          >
            Submit
          </Button>
        </form>
      </Stack>
    </div>
  );
}
