import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Contexts/UserLogin";

export default function Stafflogin() {
  const navigate = useNavigate();
  const {setUserLoggedIn} = useUserAuth()
  const [Logindetails, setLogindetails] = useState({
    email: "",
    password: "",
  });
  
  function settingLoginDetails(e) {
    let { name, value } = e.target;
    setLogindetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function Stafflogin(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND_URL}/staff/login`,
        Logindetails,
        {
          withCredentials: true,
        }
      );
      if (!res) {
        throw new Error("Error occured");
      }
      if (res.data.isLogin === true ) {
        setUserLoggedIn({
          isLogin : true ,
          userName : res.data.name,
          role :  "staff",
          userID : res.data.id
        })
        navigate("/staff/home");
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
        Staff Login
      </Typography>
      <form onSubmit={Stafflogin}>
      

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          onChange={ settingLoginDetails}
          value={Logindetails.email}
        />
        <TextField
          fullWidth
          name="password"
          onChange={settingLoginDetails}
          value={ Logindetails.password}
          label="Password"
          type="password"
          margin="normal"
        />

        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
        Login
        </Button>
      </form>
      <Button fullWidth variant="text" sx={{ mt: 1 }}>
        Cancel
      </Button>
     
    </Box>
  );
}
