import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/features/auth/authSlice";
import { showAlert } from "../store/features/alert/alertSlice";
import { clearError } from "../store/features/auth/authSlice";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [validationerrros, setValidationErrors] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    setValidationErrors((prev) => {
      return { ...prev, [e.target.name]: "" };
    });
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlevalidation = (name, value) => {
    switch (name) {
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailPattern.test(value) ? "Invalid email address" : "";
      case "username":
        return value.length < 3 ? "Username must be at least 3 characters" : "";
      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const result = handlevalidation(name, value);
    setValidationErrors((prev) => {
      return { ...prev, [name]: result };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(clearError());
      await dispatch(registerUser(formData)).unwrap();
      dispatch(
        showAlert({
          message: "registered successfully! please login to continue.",
          type: "success",
        })
      );
      navigate("/auth/login");
    } catch (err) {
      dispatch(showAlert({ message: err, type: "error" }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">TaskFlow</h1>
          <p className="mt-2 text-gray-600">Create a new account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {validationerrros.username && <p>{validationerrros.username}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="New password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
