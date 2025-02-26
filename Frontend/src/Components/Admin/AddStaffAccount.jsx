import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function AddStaffAccount() {
  const naviagate = useNavigate();
  const [vendors, setListVendors] = useState([]);

  const [Logindetails, setLogindetails] = useState({
    name: "",
    email: "",
    password: "",
    assignedvendor: "",
  });

  function settingLoginDetails(e) {
    let { name, value } = e.target;
    setLogindetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    async function fetchdata() {
      try {
        let res = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND_URL}/admin/get-vendors`,
          {
            withCredentials: true,
          }
        );
        if (!res) {
          throw new Error("Error occured");
        }
        if(res.data.isFound === true){
          setListVendors(res.data?.data);
        }
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchdata();
  },[]);

  async function AddStaff(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND_URL}/add-staff-acc`,
        Logindetails,
        {
          withCredentials: true,
        }
      );
      if (!res) {
        throw new Error("Error occured");
      }
      console.log(res.data);
      if (res.data.isLogin === true) {
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" mb={2}>
        Add Staff Account
      </Typography>
      <form onSubmit={AddStaff}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          name="name"
          onChange={settingLoginDetails}
          value={Logindetails.name}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          onChange={settingLoginDetails}
          value={Logindetails.email}
        />
        <TextField
          fullWidth
          name="password"
          onChange={settingLoginDetails}
          value={Logindetails.password}
          label="Password"
          type="password"
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Assign to Vendor</InputLabel>
          <Select
            name="assignedvendor"
            value={Logindetails.assignedvendor}
            onChange={settingLoginDetails}
          >
           
             {vendors.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.username}
              </MenuItem>
            ))} 
          </Select>
        </FormControl>
        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
          Add
        </Button>
      </form>
      <Button
        fullWidth
        variant="text"
        sx={{ mt: 1 }}
        onClick={() => naviagate(-1)}
      >
        Cancel
      </Button>
    </Box>
  );
}
