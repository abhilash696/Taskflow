import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { hideAlert } from "../store/features/alert/alertSlice";
import { useEffect } from "react";
export default function Alert() {
  const { message, type, show, duration } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    if (show) {
      let timer = setTimeout(() => {
        dispatch(hideAlert());
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, show]);

  if (!show) {
    return null;
  }

  const alertClasses = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };
  return (
    <div
      className={`fixed top-20 right-20 border-l-4 p-4 rounded ${alertClasses[type]}`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={() => dispatch(hideAlert())}
          className="ml-4 font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
