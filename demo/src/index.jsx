/**
 * @Date        2023/12/18 13:48:30
 * @Author      zono
 * @Description 第一个组件尝试
 * */
import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
// import router from "./routers/router";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);
const newRouter = createBrowserRouter(router);
const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
