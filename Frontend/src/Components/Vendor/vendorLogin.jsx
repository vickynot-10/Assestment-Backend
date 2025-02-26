import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Contexts/UserLogin";

export default function VendorLogin() {
  const navigate = useNavigate();
  const {setUserLoggedIn} = useUserAuth()
  const [showSignup, setSignup] = useState(false);
  const [signUpdetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [Logindetails, setLogindetails] = useState({
    email: "",
    password: "",
  });
  function toggleSignup() {
    setSignup(!showSignup);
    setSignupDetails({
      name: "",
      email: "",
      password: "",
    });
    setLogindetails({
      email: "",
      password: "",
    });
  }

  function settingSignupdetails(e) {
    let { name, value } = e.target;
    setSignupDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function settingLoginDetails(e) {
    let { name, value } = e.target;
    setLogindetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function VendorLogin(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND_URL}/vendor/Login`,
        Logindetails,
        {
          withCredentials: true,
        }
      );
      if (!res) {
        throw new Error("Error occured");
      }
      console.log(res.data)
      if (res.data.isLogin === true ) {
        setUserLoggedIn({
          isLogin : true ,
          userName : res.data.username,
          role :  res.data.role,
          userID : res.data.id
        })
        navigate("/vendor/home");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function VendorSignupForm(e) {
    e.preventDefault();
    console.log("sign up submission");
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND_URL}/vendor/Signup`,
        signUpdetails,
        {
          withCredentials: true,
        }
      );
      if (!res) {
        throw new Error("Error occured");
      }
      console.log(res);
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
        {showSignup ? "Vendor Sign up" : "Vendor Login"}
      </Typography>
      <form onSubmit={showSignup ? VendorSignupForm : VendorLogin}>
        {showSignup && (
          <TextField
            fullWidth
            name="name"
            label="User Name"
            margin="normal"
            onChange={settingSignupdetails}
            value={signUpdetails.name}
          />
        )}

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          onChange={showSignup ? settingSignupdetails : settingLoginDetails}
          value={showSignup ? signUpdetails.email : Logindetails.email}
        />
        <TextField
          fullWidth
          name="password"
          onChange={showSignup ? settingSignupdetails : settingLoginDetails}
          value={showSignup ? signUpdetails.password : Logindetails.password}
          label="Password"
          type="password"
          margin="normal"
        />

        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
          {showSignup ? "Sign up" : "Login"}
        </Button>
      </form>
      <Button fullWidth variant="text" sx={{ mt: 1 }}>
        Cancel
      </Button>
      <Button fullWidth onClick={toggleSignup} variant="text" sx={{ mt: 1 }}>
        {showSignup
          ? "Already have an Account , Login"
          : "Dont have an account , Sign up"}
      </Button>
    </Box>
  );
}
