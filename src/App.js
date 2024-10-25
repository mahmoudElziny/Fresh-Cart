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
import ProductDetails from "./Components/ProductDetails/ProductDetails";

export default function App() {
  let queryClient = new QueryClient();

  let routes = createBrowserRouter([
    {
      path: "/Fresh-Cart",
      element: <Layout />,
      children: [
        {
          index: true,
          path: "/Fresh-Cart",
          element: (
            <GuardRouting>
              {" "}
              <Home />{" "}
            </GuardRouting>
          ),
        },
        {
          path: "Fresh-Cart/products",
          element: (
            <GuardRouting>
              {" "}
              <Products />{" "}
            </GuardRouting>
          ),
        },
        {
          path: "Fresh-Cart/productDetails/:_id",
          element: (
            <GuardRouting>
              {" "}
              <ProductDetails />{" "}
            </GuardRouting>
          )
        },
        {
          path: "Fresh-Cart/categories",
          element: (
            <GuardRouting>
              {" "}
              <Categories />{" "}
            </GuardRouting>
          ),
        },
        {
          path: "Fresh-Cart/brands",
          element: (
            <GuardRouting>
              {" "}
              <Brands />{" "}
            </GuardRouting>
          ),
        },
        {
          path: "Fresh-Cart/cart",
          element: (
            <GuardRouting>
              {" "}
              <Cart />{" "}
            </GuardRouting>
          ),
        },
        { path: "Fresh-Cart/login", element: <Login /> },
        { path: "Fresh-Cart/register", element: <Register /> },
        { path: "Fresh-Cart/forgetPassword", element: <ForgetPassword /> },
        { path: "Fresh-Cart/resetPassword", element: <ResetPassword /> },
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