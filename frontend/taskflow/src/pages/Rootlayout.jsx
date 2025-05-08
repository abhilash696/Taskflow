import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/auth/authSlice";
import { useEffect } from "react";

export default function Rootlayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  console.log(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;
    else {
      const expiresAt = Number(localStorage.getItem("expiresAt"));
      console.log(expiresAt);
      const time_remaining = expiresAt - Date.now();
      console.log(time_remaining);
      if (time_remaining < 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiresAt");
        dispatch(logout());
        return;
      }
      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("expiresAt");
        dispatch(logout());
      }, time_remaining);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <Navbar />
      <Alert />
      <div>
        <Outlet />
      </div>
    </>
  );
}
