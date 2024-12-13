import { createBrowserRouter } from "react-router-dom";
import Cart from "@components/organisms/Cart/Cart";
import { Layout } from "@components/organisms";
import ProfileLayout from "@components/organisms/ProfileLayout/ProfileLayout";
import {
  AboutScreen,
  BlogsScreen,
  ContactScreen,
  HomeScreen,
  Shop,
  SearchScreen as Search,
  ProductDetails,
  Logout,
  Orders,
  Payment,
  PersonalData,
  Returns,
  Verification,
  Wishlist,
  AuthPage,
  OrderDetails,
} from "@pages/Screens";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "*",
        element: <HomeScreen />, 
      },
      {
        path: "blogs",
        element: <BlogsScreen />,
      },
      {
        path: "order-details",
        element: <OrderDetails />,
      },
      
      {
        path: "contact-us",
        element: <ContactScreen />,
      },
      {
        path: "about-us",
        element: <AboutScreen />,
      },
      {
        path: "products/:category/:item?",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "authentication",
        element: <AuthPage />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <PersonalData />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "returns",
            element: <Returns />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
          },
          {
            path: "verification",
            element: <Verification />,
          },
          {
            path: "payment-credit-card",
            element: <Payment />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
    ],
    
  },
]);
