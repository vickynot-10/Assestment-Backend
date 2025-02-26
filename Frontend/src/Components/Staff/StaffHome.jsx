import { useState,useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../../Contexts/UserLogin";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export default function StaffHome(){
    const navigate = useNavigate();
    const containerStyle = {
        display : "flex",
        flexWrap : "wrap",
        alignItems : "center",
        width : "80%",
        margin :"auto",
        gap :"20px",
        justifyContent : "space-between",
        padding : "20px"
      }
    const [isLoading, setloading] = useState(true);
    const {isUserLoggedIn} = useUserAuth()
    const [resData,setResData]= useState({
        isFound : false , arr : []
    })
    useEffect(()=>{
        async function fetchData() {
            try {
                let res = await axios.get(
                  `${import.meta.env.VITE_URL_BACKEND_URL}/staff/vendors/${isUserLoggedIn.userID}`,
                  {
                    withCredentials: true,
                  }
                );
                if (!res) {
                  throw new Error("Error occured");
                }
               if(res.data.isFound === true){
                setResData({
                    isFound : true ,
                    arr : res.data.data
                })
               }
                 
                
              } catch (e) {
                console.log(e);
              }
            finally{
                setloading(false)
            }
        }
        fetchData();
    },[])

    function navToAdd(){
        navigate('/staff/add-product')
    }

    return(
        <>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div style={{display : 'flex' , flexDirection : 'column'}} >
            <h4>Product Details of vendors u have assigned</h4>

            <Button variant="contained" color="primary" sx={{
                width : "300px" , alignSelf : "center"
            }} onClick={navToAdd}>
          Add Product to this Vendor
        </Button>
  
            <div style={containerStyle} >
               {
                (resData.isFound && resData.arr.length > 0 ) &&  (
                
                  resData.arr.map((item)=>{
                    return (
                      <Card sx={{ width: 345 }} key={item._id} >
                      <CardMedia
                        component="img"
                        alt={item.ProductName}
                        height="140"
                        image={`${import.meta.env.VITE_URL_BACKEND_URL}/uploads/${item.ProductImg}`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.ProductName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {
                            item.ProductDesc !== null ?   item.ProductDesc : item.ProductCategory !== null ? item.ProductCategory : item.freeDelivery === true ? "Free Delivery" : `Delivery Fee ${item.deliveryFee}`
                          }
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Typography color="primary" > {item.ProductNewPrice} </Typography>
                      </CardActions>
                      <IconButton>

                      </IconButton>
                    </Card>
                    )
                  })
  
                )
              }
   
           
  
            </div>
          
          </div>
        )}
      </>
    )
}