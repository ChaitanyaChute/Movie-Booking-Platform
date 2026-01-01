import axios from "axios";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token: string;
  username?: string;
  isAdmin?: boolean;
}

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function Login() {
    const username = usernameRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    try {
      const res = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
        { username, password },
        {
          // enable only if backend uses cookies/sessions
          withCredentials: true,
        }
      );

      // --- adjust here if backend shape is different ---
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ username: res.data.username ?? username, isAdmin: true })
        );

        // Notify navbar about auth change
        window.dispatchEvent(new Event('authChange'));

        toast.success("Logged in as Admin successfully!");
        navigate("/admin", { state: { fromLogin: true } });
      } else {
        toast.error("Login failed. Invalid credentials.");
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F0F10] px-4">
      <div className="bg-[#1A1A1C] p-8 rounded-lg shadow-xl w-full max-w-sm border border-[#2a2a2b]">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back Admin
        </h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm">Username</label>
          <input
            ref={usernameRef}
            type="text"
            className="w-full px-4 py-2 bg-[#0F0F10] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#EF3A55] transition"
            placeholder="Enter your Admin username"
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
      </div>
    </div>
  );
};

export default AdminLogin;
