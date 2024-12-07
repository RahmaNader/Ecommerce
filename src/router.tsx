import { createBrowserRouter } from "react-router-dom";
import Cart from "@components/organisms/Cart/Cart";
import { Layout } from "@components/organisms";
import {
  AboutScreen,
  BlogsScreen,
  ContactScreen,
  HomeScreen,
  Shop,
  SearchScreen as Search,
} from "@pages/Screens";

import AuthPage from '@pages/Screens/Authentication/AuthPage';
import CheckOut from "@components/organisms/CheckOut/CheckOut";

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
    ],
  },
]);
