import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./components/Login";
import MainContainer from "./components/MainContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { AnimatePresence } from "framer-motion";
import { Provider, useSelector } from "react-redux";
import store from "./utils/store";
import Dashboard from "./components/Dashboard";
import DBHome from "./components/DBHome";
import DBOrders from "./components/DBOrders";
import DBProfile from "./components/DBProfile";
import Order from "./components/Order";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Home from "./components/Home";
import Cart from "./components/Cart";
import CheckOutSuccess from "./components/CheckOutSuccess";
import AboutUs from "./components/AboutUs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
        children: [
          {
            path: "order",
            element: <Order />,
          },
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "restaurant/:id",
            element: <RestaurantMenu />,
          },
          {
            path: "checkout",
            element: <Cart />,
          },
          {
            path: "aboutUs",
            element: <AboutUs />,
          },
        ],
      },
    ],

    errorElement: <Error />,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "checkOutSuccess",
    element: <CheckOutSuccess />,
    errorElement: <Error />,
  },
  {
    path: "dashboard/*",
    element: <Dashboard />,
    children: [
      {
        path: "home",
        element: <DBHome />,
      },
      {
        path: "orders",
        element: <DBOrders />,
      },

      {
        path: "profile",
        element: <DBProfile />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AnimatePresence>
        <RouterProvider router={appRouter} />
      </AnimatePresence>
    </Provider>
  </React.StrictMode>
);
