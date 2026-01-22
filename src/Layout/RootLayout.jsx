import React from "react";

import { Outlet } from "react-router";
import Navbar from "../Component/Shared/Navber/Navber";
import Footer from "../Component/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-slate-100">
      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-68px)] ">
        <Outlet className="" />
      </div>
    </div>
  );
};

export default RootLayout;
