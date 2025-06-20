import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
      general: "",
    }));
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(result.data.user));

      navigate("/news");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const backendErrors = error.response.data.details || [];
        const newErrors = { email: "", password: "" };
        backendErrors.forEach((err) => {
          if (err.field in newErrors) {
            newErrors[err.field] = err.message;
          }
        });

        setErrors(newErrors);
      } else {
        setErrors((prev) => ({
          ...prev,
          general: error.message || "Registration failed. Please try again.",
        }));
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {errors.general && (
            <div className="mb-4 text-red-500 text-sm">{errors.general}</div>
          )}

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account?
          <Link className="text-orange-500 ml-1" to="/signup">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
