import { createBrowserRouter } from "react-router-dom";

import Cart from "@components/organisms/Cart/Cart";
import { Layout } from "@components/organisms";
import {
  AboutScreen,
  BlogsScreen,
  ContactScreen,
  HomeScreen,
  Shop,
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
        path: "blogs",
        element: <BlogsScreen />,
      },
      {
        path: "contact",
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
