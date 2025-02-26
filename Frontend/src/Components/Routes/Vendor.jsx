import { useUserAuth } from "../../Contexts/UserLogin";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const VendorRoute = ({ element }) => {
  const { isUserLoggedIn } = useUserAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isUserLoggedIn.isLogin !== undefined) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [isUserLoggedIn]);


  if (loading) {
    return <div>Loading...</div>; 
  }

  return isUserLoggedIn.isLogin && isUserLoggedIn.role === "vendor" ? (
    element
  ) : (
    <Navigate to="/vendor" replace />
  );
};
