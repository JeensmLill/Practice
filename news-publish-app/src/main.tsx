import React from "react";
import ReactDOM from "react-dom/client";

import {RouterProvider,} from "react-router-dom";
import router from "./routes/index";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <RouterProvider router={router} />
// );
