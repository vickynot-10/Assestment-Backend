import { useState, useRef ,useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton, Modal, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const searchbox = useRef(null);
  const [open, setOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [signUpdetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [Logindetails, setLogindetails] = useState({
    email: "",
    password: "",
  });

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

  function handleClickOutside(event) {
    if (searchbox.current && !searchbox.current.contains(event.target)) {
      setsearchValue('')
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  async function SignupForm(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND_URL}/register`,
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

  async function LoginForm(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND_URL}/Login`,
        Logindetails,
        {
          withCredentials: true,
        }
      );
      if (!res) {
        throw new Error("Error occured");
      }
      if (res.data?.isLogin === true) {
        console.log("Login");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const [searchValue, setsearchValue] = useState("");
  const [debouncing, setDebouncing] = useState(null);
  const [searchresults, setSearchResults] = useState([]);

  function seachBoxDebounce(e) {
    let { value } = e.target;
    setsearchValue(value);
    if (debouncing) {
      clearTimeout(debouncing);
    }
    const newDebounce = setTimeout(() => {
      fetchSearchData(searchValue);
    }, 5000);

    setDebouncing(newDebounce);
  }
  async function fetchSearchData(str) {
    if (str === "") {
      setsearchValue("");
      return;
    }
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND_URL}/search?Searchquery=${str}`,
        {
          withCredentials: true,
        }
      );
      if (!res) {
        throw new Error("Error occured");
      }
      console.log(res.data);
      if (res.data.isFound === true) {
        setSearchResults(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function NavtoProduct(id) {
    console.log(id);
    if (id === null || !id) {
      return;
    }
    navigate(`/view-product/${id}`);
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              E-Commerce Site
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchValue}
              onChange={seachBoxDebounce}
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                mr: 2,
                width: "250px",
              }}
            />
            {searchresults.length === 0 && searchValue.length > 3 && (
              <Box
                ref={searchbox}
                sx={{
                  position: "absolute",
                  top: "56px",
                  left: "50%",
                  width: "250px",
                  bgcolor: "white",
                  boxShadow: 3,
                  borderRadius: 1,
                  zIndex: 10,
                  maxHeight: "200px",
                  overflowY: "auto",
                  mt: 1,
                }}
              >
                <Typography color="black" sx={{ p: 1, borderBottom: "1px solid #ddd" }}>
                  0 Products Found
                </Typography>
              </Box>
            )}
            {searchresults.length > 0 && searchValue.length > 2 && (
              <Box
                ref={searchbox}
                sx={{
                  position: "absolute",
                  top: "56px",
                  left: "50%",

                  width: "250px",
                  bgcolor: "white",
                  boxShadow: 3,
                  borderRadius: 1,
                  zIndex: 10,
                  maxHeight: "200px",
                  overflowY: "auto",
                  mt: 1,
                }}
              >
                {searchresults.map((product) => {
                  return (
                    <div
                      key={product._id}
                      style={{
                        display: "flex",
                        borderBottom: "1px solid #ddd",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography color="black" sx={{ p: 2 }}>
                        {product.ProductName}
                        {product.ProductCategory
                          ? ` - ${product.ProductCategory}`
                          : ""}
                      </Typography>
                      <IconButton onClick={() => NavtoProduct(product._id)}>
                        <ArrowForwardIosIcon fontSize="small" color="action" />
                      </IconButton>
                    </div>
                  );
                })}
              </Box>
            )}
            <Button color="inherit" onClick={() => setOpen(true)}>
              Login
            </Button>
            <Button color="inherit" onClick={() => setSignupOpen(true)}>
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
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
              Login
            </Typography>
            <form onSubmit={LoginForm}>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                onChange={settingLoginDetails}
              />
              <TextField
                fullWidth
                name="password"
                onChange={settingLoginDetails}
                label="Password"
                type="password"
                margin="normal"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
              >
                Login
              </Button>
            </form>
            <Button
              fullWidth
              variant="text"
              sx={{ mt: 1 }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      )}

      {isSignupOpen && (
        <Modal open={isSignupOpen} onClose={() => setSignupOpen(false)}>
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
              Sign Up
            </Typography>
            <form onSubmit={SignupForm}>
              <TextField
                fullWidth
                name="name"
                label="User Name"
                margin="normal"
                onChange={settingSignupdetails}
              />
              <TextField
                name="email"
                fullWidth
                label="Email"
                margin="normal"
                onChange={settingSignupdetails}
              />
              <TextField
                name="password"
                onChange={settingSignupdetails}
                fullWidth
                label="Password"
                type="password"
                margin="normal"
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
              >
                Sign up
              </Button>
            </form>

            <Button
              fullWidth
              variant="text"
              sx={{ mt: 1 }}
              onClick={() => setSignupOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
}
