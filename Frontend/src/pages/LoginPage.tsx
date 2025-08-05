import axios from "axios";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface LoginFuncProp {
  LoginFunc: (username: string) => void; 
}

interface LoginResponse {
  token: string;
  username: string;
  password: string;
}

const LoginPage: React.FC<LoginFuncProp> = ({ LoginFunc }) => {
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function Login() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          username,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      try {
        LoginFunc(username); // pass username here ✅
      } catch (e) {
        console.error("Error in LoginFunc:", e);
      }

      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F0F10] px-4">
      <div className="bg-[#1A1A1C] p-8 rounded-lg shadow-xl w-full max-w-sm border border-[#2a2a2b]">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm">Username</label>
          <input
            ref={usernameRef}
            type="text"
            className="w-full px-4 py-2 bg-[#0F0F10] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#EF3A55] transition"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2 text-sm">Password</label>
          <input
            ref={passwordRef}
            type="password"
            className="w-full px-4 py-2 bg-[#0F0F10] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#EF3A55] transition"
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={Login}
          className="w-full bg-[#EF3A55] hover:bg-[#d72d48] text-white py-2 px-4 rounded transition-colors"
        >
          Login
        </button>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/auth/s"
            className="text-[#EF3A55] font-semibold hover:underline"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
