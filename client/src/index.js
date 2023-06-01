import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./components/Login";
import MainContainer from "./components/MainContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import store from "./utils/store";
import Dashboard from "./components/Dashboard";
import DBHome from "./components/DBHome";
import DBAddNewItem from "./components/DBAddNewItem";
import DBItems from "./components/DBItems";
import DBNewItems from "./components/DBNewItems";
import DBOrders from "./components/DBOrders";
import DBUsers from "./components/DBUsers";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
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
        path: "newItem",
        element: <DBNewItems />,
      },
      {
        path: "addNewItem",
        element: <DBAddNewItem />,
      },
      {
        path: "items",
        element: <DBItems />,
      },
      {
        path: "users",
        element: <DBUsers />,
      },
    ],
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
