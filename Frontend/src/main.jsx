import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Play from "./pages/Play.jsx";
import CreatePoll from "./pages/CreatePoll.jsx";
import MyPolls from "./pages/MyPolls.jsx";
import Logout from "./pages/Logout.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} exact />
      <Route index path="register" element={<Register exact />} />
      <Route path="dashboard" element={<Dashboard exact />} />
      <Route path="play" element={<Play exact />} />
      <Route path="create" element={<CreatePoll exact />} />
      <Route path="mypolls" element={<MyPolls exact />} />
      <Route path="logout" element={<Logout exact/>}/>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
