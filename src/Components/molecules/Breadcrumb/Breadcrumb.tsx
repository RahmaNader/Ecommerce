import React from "react";
import { useLocation, Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Typography from "@mui/material/Typography";
import {Category} from "@types";
import { useQuery } from "react-query";
import { fetchCategories } from "@services/api/fetchCategories";
import { useLanguage } from "@context/useLanguage";

const routeNameMap: { [key: string]: { en: string; ar: string } } = {
  "/": { en: "Home", ar: "الرئيسية" },
  "/blogs": { en: "Blogs", ar: "المدونات" },
  "/order-details": { en: "Order Details", ar: "تفاصيل الطلب" },
  "/contact-us": { en: "Contact Us", ar: "اتصل بنا" },
  "/about-us": { en: "About Us", ar: "معلومات عنا" },
  "/cart": { en: "Cart", ar: "عربة التسوق" },
  // Add this line for the authentication page
  "/auth": { en: "Authentication", ar: "تسجيل الدخول" },
  "/authentication": { en: "Authentication", ar: "تسجيل الدخول" },
  "/cart/checkout": { en: "Checkout", ar: "الدفع" },
  "/search": { en: "Search", ar: "بحث" },
  "/profile": { en: "Profile", ar: "الملف الشخصي" },
  "/profile/orders": { en: "Orders", ar: "الطلبات" },
  "/profile/returns": { en: "Returns", ar: "المرتجعات" },
  "/profile/wishlist": { en: "Wishlist", ar: "المفضلة" },
  "/profile/verification": { en: "Verification", ar: "التحقق" },
  "/profile/payment-credit-card": { en: "Payment", ar: "الدفع" },
  "/profile/logout": { en: "Logout", ar: "تسجيل الخروج" },
  "/product-details/:id": { en: "Product Details", ar: "تفاصيل المنتج" },
};

const capitalizeWords = (text: string): string =>
  text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const Breadcrumb: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const isRTL = language === "ar";
  
  const { data: categories } = useQuery("categories", fetchCategories);

  const pathnames = location.pathname
    .split("/")
    .filter(x => x)
    .map(segment => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    });

  const getCategoryName = (categoryIdOrSlug: string | number) => {
    if (!categories) return capitalizeWords(String(categoryIdOrSlug));
    
    const decodedSlug = typeof categoryIdOrSlug === 'string' ? 
      categoryIdOrSlug : String(categoryIdOrSlug);
    
    const categoryById = categories.find((cat: Category) => 
      cat.categoryID === Number(categoryIdOrSlug)
    );
    
    if (categoryById) {
      return isRTL ? categoryById.nameAr || categoryById.name : categoryById.nameEn || categoryById.name;
    }
    
    const categoryBySlug = categories.find((cat: Category) => 
      cat.name.toLowerCase() === decodedSlug.toLowerCase() ||
      cat.nameEn.toLowerCase() === decodedSlug.toLowerCase() ||
      cat.nameAr.toLowerCase() === decodedSlug.toLowerCase()
    );
    
    if (categoryBySlug) {
      return isRTL ? categoryBySlug.nameAr || categoryBySlug.name : categoryBySlug.nameEn || categoryBySlug.name;
    }
    
    return capitalizeWords(decodedSlug);
  };

  const breadcrumbs = pathnames
    .map((value, index) => {
      if (value.toLowerCase() === "products") {
        return null;
      }

      const segments = location.pathname.split('/').filter(Boolean).slice(0, index + 1);
      const to = `/${segments.join("/")}`;
      const isLast = index === pathnames.length - 1;

      let breadcrumbName = '';
      
      if (routeNameMap[to]) {
        breadcrumbName = routeNameMap[to][isRTL ? 'ar' : 'en'];
      } else if (pathnames[0] === 'products') {
        breadcrumbName = getCategoryName(value);
      } else {
        breadcrumbName = capitalizeWords(value);
      }

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
      separator={
        isRTL ? (
          <NavigateBeforeIcon fontSize="small" style={{ color: "#A78E78" }} />
        ) : (
          <NavigateNextIcon fontSize="small" style={{ color: "#A78E78" }} />
        )
      }
      aria-label="breadcrumb"
      sx={{
        margin: "1rem 0",
        padding: "0.5rem 1rem",
        color: "#A78E78",
        display: "flex",
        flexDirection: isRTL ? "row-reverse" : "row",
        justifyContent: isRTL ? "flex-end" : "flex-start",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "#A78E78" }}>
        {isRTL ? routeNameMap["/"].ar : routeNameMap["/"].en}
      </Link>
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default Breadcrumb;