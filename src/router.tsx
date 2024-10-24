import { createBrowserRouter } from "react-router-dom";
import {
  HomeScreen,
  ContactScreen,
  BlogsScreen,
  AboutScreen,
  Shop,
} from "@pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/blogs",
    element: <BlogsScreen />,
  },
  {
    path: "/contact",
    element: <ContactScreen />
  },
  {
    path: "/about-us",
    element: <AboutScreen />
  },
  {
    path: "/products/:category/:item",
    element: <Shop />
  },
]);
