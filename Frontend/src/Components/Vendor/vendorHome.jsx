import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function VendorHome() {
  const navigate = useNavigate();
  function NavUrl(str) {
    navigate(`/vendor/${str}`);
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="primary" onClick={() => NavUrl("add")}>
        Add Product
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => NavUrl("view")}
      >
        View Product
      </Button>
    </Stack>
  );
}
