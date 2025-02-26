
import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  Typography
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
export default function ViewUsers() {

  const [resData, setResData] = useState({
    isFind: false,
    arr: [],
  });
  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get(
            `${import.meta.env.VITE_URL_BACKEND_URL}/admin/get-users`,
            {
              withCredentials: true,
            }

          );
          if(res.data.isFound === true){
            setResData({
                isFind : true , arr : res.data.data
            })
          }
          if (!res) {
            throw new Error("Error occured");
          }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
  }, []);
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        Users List
      </Typography>
      {
        resData.isFind === false && resData.arr.length <= 0 && <p>0 Profiles Found</p>
      }
      <List>
        {
            resData.isFind && resData.arr.length > 0 && 
            resData.arr.map((user, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={user.username}
                      secondary={`${user.email} - ${user.role}`}
                    />
                  </ListItem>
                </div>
              ))
        }
      
      </List>
    </Card>
  );
}
