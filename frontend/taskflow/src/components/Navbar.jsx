import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/features/auth/authSlice";
export default function Navbar() {
  const isloggedin = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user) || false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (confirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiresAt");
      dispatch(logout());
      navigate("/");
    }
    return null;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-blue-600 hover:text-blue-700"
            >
              TaskFlow
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/tasks/newtask"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              create task
            </Link>
            {user.role === "admin" && (
              <Link
                to="/admin?admin=true"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                admin
              </Link>
            )}

            <Link
              to="/tasks"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              My tasks
            </Link>
            {isloggedin ? (
              <button
                onClick={handlelogout}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
