import React, { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import { UserContext } from "./Contexts/userContext";
import GuardRouting from "./Components/ProtectRouting/GuardRouting";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'

export default function App() {
  let queryClient = new QueryClient();

  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          path: "/",
          element: (
            <GuardRouting>
              {" "}
              <Home />{" "}
            </GuardRouting>
          ),
        },
        {
          path: "products",
          element: (
            <GuardRouting>
              {" "}
              <Products />{" "}
            </GuardRouting>
          ),
        },
        {
          path: "categories",
          element: (
            <GuardRouting>
              {" "}
              <Categories />{" "}
            </GuardRouting>
          ),
        },
        {
          path: "brands",
          element: (
            <GuardRouting>
              {" "}
              <Brands />{" "}
            </GuardRouting>
          ),
        },
        {
          path: "cart",
          element: (
            <GuardRouting>
              {" "}
              <Cart />{" "}
            </GuardRouting>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}> </ReactQueryDevtools>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </>
  );
}
