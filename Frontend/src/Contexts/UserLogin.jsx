import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';
const UserAuthContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isUserLoggedIn, setUserLoggedIn] = useState({
    isLogin: false,
    userName: "",
    role : "",
    userID : ''
  });
  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND_URL}/user/me`,
          {
            withCredentials: true,
          }
        );

        if (!res) {
          throw new Error("Error occured");
        }
        if(res.data.isLoggedInobj === true){
            
            setUserLoggedIn({
                isLogin : true ,
                userName : res.data.userdata.username,
                role :  res.data.userdata.role,
                userID : res.data.userdata._id
            })
        }
      } catch (e) {
        setUserLoggedIn({
            isLogin: false,
            userName: "",
            role : ""
        })
      }
    }
    fetchData()
  }, []);

  return <UserAuthContext.Provider value={{isUserLoggedIn , setUserLoggedIn}} >{children}</UserAuthContext.Provider>;
};
export const useUserAuth = () => useContext(UserAuthContext);