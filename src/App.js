import React from "react";
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

export default function App() {

  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
          {path: "home", element: <Home />},
          {path: "products", element: <Products />},
          {path: "categories", element: <Categories />},
          {path: "login", element: <Login />},
          {path: "cart", element: <Cart />},
          {path: "brands", element: <Brands />},
          {index: true, element: <Register />},
          {path: "*", element: <NotFound />},
    ]}, 
  ]);
  return (
    <>
        <RouterProvider router={routes} /> 
    </>
  )
}

