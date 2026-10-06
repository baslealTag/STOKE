/* eslint-disable react-hooks/immutability */
import React from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = ({ token }) => {
  return token ? <Outlet /> : (window.location.href = "/login");
};

export default ProtectedRoutes;
