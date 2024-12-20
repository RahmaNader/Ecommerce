import React from "react";
import { useLocation, Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";


const routeNameMap: { [key: string]: string } = {
  "/": "Home",
  "/blogs": "Blogs",
  "/order-details": "Order Details",
  "/contact-us": "Contact Us",
  "/about-us": "About Us",
  "/cart": "Cart",
  "/search": "Search",
  "/profile": "Profile",
  "/profile/orders": "Orders",
  "/profile/returns": "Returns",
  "/profile/wishlist": "Wishlist",
  "/profile/verification": "Verification",
  "/profile/payment-credit-card": "Payment",
  "/profile/logout": "Logout",
  "/product-details/:id": "Product Details",
};

const capitalizeWords = (text: string): string =>
  text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const Breadcrumb: React.FC = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbs = pathnames
    .map((value, index) => {
      if (value.toLowerCase() === "products") {
        return null;
      }

      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;

      const breadcrumbName = capitalizeWords(routeNameMap[to] || value);

      return isLast ? (
        <Typography
          key={to}
          sx={{
            color: "#721013", 
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {breadcrumbName}
        </Typography>
      ) : (
        <Link
          key={to}
          to={to}
          style={{
            textDecoration: "none",
            color: "#A78E78",
            fontSize: "1rem",
          }}
        >
          {breadcrumbName}
        </Link>
      );
    })
    .filter((breadcrumb) => breadcrumb !== null);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" style={{ color: "#A78E78" }} />}
      aria-label="breadcrumb"
      sx={{
        margin: "1rem 0",
        padding: "0.5rem 1rem",
        color: "#A78E78",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "#A78E78" }}>
        {capitalizeWords(routeNameMap["/"])}
      </Link>
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default Breadcrumb;