import { createBrowserRouter } from "react-router-dom";
import Cart from "@components/organisms/Cart/Cart";
import { Layout } from "@components/organisms";
import CheckOut from "@components/organisms/CheckOut/CheckOut";
import {
  AboutScreen,
  BlogsScreen,
  ContactScreen,
  HomeScreen,
  Shop,
  SearchScreen as Search,
  ProductDetails as ProductDetails,
  AuthPage,
} from "@pages/Screens";
import OrderConfirmation from "@components/molecules/OrderConfirmation/OrderConfirmation";

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
        path: "blogs",
        element: <BlogsScreen />,
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
        path: "checkOut",
        element: <CheckOut />,
      },
      {
        path: "orderConfirmaton",
        element: <OrderConfirmation />,
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
        path: "search",
        element: <Search />,
      },
    ],
  },
]);
