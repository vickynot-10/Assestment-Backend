import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Grid, Typography, Chip, Divider } from "@mui/material";

export default function SeparateProduct() {
  const { id } = useParams();
  const [resData, setResData] = useState({
    isFound: false,
    obj: null,
    ownername: "",
  });
  const [isLoading, setloading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND_URL}/get-product/view/${id}`,
          {
            withCredentials: true,
          }
        );
        if (!res) {
          throw new Error("Error occured try again");
        }
        if (res.data.isFound === true) {
          setResData({
            isFound: true,
            obj: res.data.data,
            ownername: res.data.owner,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setloading(false);
      }
    }
    fetchData();
  }, []);
  function formatDate(dateString) {
    if (!dateString) {
      return 0;
    }

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function calculateDiscount(old, newp, str) {
    let oldprice = Number(old);
    let newprice = Number(newp);
    if (isNaN(newprice)) {
      newprice = 0;
    }
    if (isNaN(oldprice)) {
      oldprice = 0;
    }
    let discountPrice = oldprice > newprice ? oldprice - newprice : 0;
    if (str === "amt") {
      return discountPrice;
    }
    if (str === "percentage") {
      let percent =
        oldprice > newprice
          ? (((oldprice - newprice) / oldprice) * 100).toFixed(2)
          : 0;
      return percent;
    }
  }

  return (
    <>
      {isLoading ? (
        <div>Loading .. </div>
      ) : (
        <div>
          {resData.isFound === true && resData.obj && (
            <Box
              sx={{
                p: 3,
                maxWidth: 600,
                mx: "auto",
                bgcolor: "#f9f9f9",
                borderRadius: 2,
              }}
            >
              {resData.obj?.ProductImg !== null &&
                resData.obj?.ProductImg !== "" && (
                  <Box
                    component="img"
                    src={`${import.meta.env.VITE_URL_BACKEND_URL}/uploads/${
                      resData.obj.ProductImg
                    }`}
                    alt={resData.obj?.ProductName}
                    sx={{
                      width: "100%",
                      maxHeight: 300,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                )}

              <Typography
                variant="h5"
                sx={{ textAlign: "center" }}
                fontWeight="bolder"
              >
                {resData.ownername}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {resData.obj?.ProductName}
              </Typography>

              {resData.obj?.ProductDesc && (
                <Typography variant="body1" color="textSecondary">
                  {resData.obj?.ProductDesc}
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Typography variant="h6" color="primary">
                    ₹{resData.obj?.ProductNewPrice}
                  </Typography>
                </Grid>

                {Number(resData.obj?.ProductOldPrice) >
                  Number(resData.obj?.ProductNewPrice) && (
                  <Grid item>
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: "line-through", color: "gray" }}
                    >
                      ₹{resData.obj?.ProductOldPrice}
                    </Typography>
                  </Grid>
                )}

                {resData.obj?.discountPercentage !== 0 &&
                  resData.obj?.discountPercentage > 0 && (
                    <Grid item>
                      <Chip
                        label={calculateDiscount(
                          resData.obj?.ProductOldPrice,
                          resData.obj?.ProductNewPrice,
                          "percentage"
                        )}
                        color="success"
                      />
                    </Grid>
                  )}
              </Grid>
              {resData.obj?.discountAmt !== 0 &&
                resData.obj?.discountAmt > 0 && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Discount: ₹{" "}
                    {calculateDiscount(
                      resData.obj?.ProductOldPrice,
                      resData.obj?.ProductNewPrice,
                      "amt"
                    )}
                  </Typography>
                )}
              {resData.obj?.expirydate !== "" &&
                resData.obj?.expirydate !== null && (
                  <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                    Offer valid until: {formatDate(resData.obj?.expirydate)}
                  </Typography>
                )}

              {resData.obj?.freeDelivery ? (
                <Chip label="Free Delivery" color="primary" sx={{ mt: 2 }} />
              ) : (
                <Chip
                  label="Delivery Charges Apply"
                  color="error"
                  sx={{ mt: 2 }}
                />
              )}
            </Box>
          )}
        </div>
      )}
    </>
  );
}
