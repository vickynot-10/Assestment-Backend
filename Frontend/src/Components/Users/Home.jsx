import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Pagination,
  CardActions,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const [resdata, setResdata] = useState({
    isFound: false,
    arr: [],
  });
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  function NaigateURL(id) {
    if (id === null || !id) {
      return;
    }
    navigate(`view-product/${id}`);
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND_URL}/get-product?page=${page}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.isFound === true) {
          setTotalPages(res.data.TotalPages);
          setResdata({
            isFound: true,
            arr: res.data.productData,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  function calculateDiscount(old, newp) {
    let oldprice = Number(old);
    let newprice = Number(newp);
    if (isNaN(newprice)) {
      newprice = 0;
    }
    if (isNaN(oldprice)) {
      oldprice = 0;
    }
    let percent = oldprice > newprice
        ? (((oldprice - newprice) / oldprice) * 100).toFixed(2)
        : 0;
    return percent;
  }
  return (
    <>
      {isLoading && <div>Loading ...</div>}
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Product Listings
        </Typography>
        <Grid container spacing={3}>
          {resdata.isFound &&
            resdata.arr.length > 0 &&
            resdata.arr.map((product) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={`${import.meta.env.VITE_URL_BACKEND_URL}/uploads/${
                        product.ProductImg
                      }`}
                      alt={product.ProductName}
                    />
                    <CardContent>
                      <Typography variant="h6">
                        {product.ProductName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.ProductDesc}
                      </Typography>

                      <Typography variant="body1">
                        <b>Price:</b> ₹{product.ProductNewPrice}
                        {product.ProductOldPrice !== 0 &&
                          product.ProductOldPrice > 0 &&
                          product.ProductOldPrice > product.ProductNewPrice && (
                            <s style={{ color: "red" }}>
                              ₹{product.ProductOldPrice}
                            </s>
                          )}
                      </Typography>

                      {product.discountPercentage !== 0 &&
                        product.discountPercentage > 0 && (
                          <Typography variant="body2" color="primary">
                            Discount: {calculateDiscount(product.ProductOldPrice,product.ProductNewPrice)}% OFF
                          </Typography>
                        )}
                      {product.freeDelivery ? (
                        <Typography variant="body2" color="green">
                          Free Delivery
                        </Typography>
                      ) : (
                        <Typography variant="body2">
                          Delivery Fee: ₹{product.deliveryFee || 0}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => NaigateURL(product._id)}
                      >
                        View
                      </Button>
                      <Typography color="primary">
                        {product.ProductOwner?.username || "Vendor"}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Container>
    </>
  );
}
