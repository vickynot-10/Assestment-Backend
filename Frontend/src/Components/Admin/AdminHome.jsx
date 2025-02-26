import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
export default function AdminHome() {
    const navigate = useNavigate();

    function navigateURL(str){
        navigate(`/admin/view/${str}`);
    }
  const cards = [
    { title: "View Users", value: "users" },
    { title: "View Staffs", value: "staffs" },
    { title: "View Vendors", value: "vendors" },
    { title: "Add Staff Account", value: "add_staff" },
    { title: "Add Products", value: "add-product" },
  ];

  return (
    <Grid container spacing={2} justifyContent="center">
      {cards.map((card, index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", p: 2, cursor: "pointer" }}>
            <CardContent>
              <PersonIcon sx={{ fontSize: 50, color: "primary.main" }} />
              <Typography variant="h6" mt={1}>
                {card.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                sx={{ display: "block", margin: "auto", mt: 2 }}
                onClick={()=>navigateURL(card.value)}
              >
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
