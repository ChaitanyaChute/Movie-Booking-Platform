import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom"; 

function Signuppage() {
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function Signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      toast.error("Both fields are required");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
        username,
        password,
      });

      toast.success("Signed up successfully!");
      navigate("/auth");
    } catch (err) {
      toast.error("Signup failed. Try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F0F10] px-4">
      <div className="bg-[#1A1A1C] p-8 rounded-lg shadow-xl w-full max-w-sm border border-[#2a2a2b]">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm">Username</label>
          <input
            ref={usernameRef}
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full px-4 py-2 bg-[#0F0F10] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#EF3A55] transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2 text-sm">Password</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 bg-[#0F0F10] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#EF3A55] transition"
          />
        </div>

        <button
          onClick={Signup}
          className="w-full bg-[#EF3A55] hover:bg-[#d72d48] text-white py-2 px-4 rounded transition-colors"
        >
          Sign Up
        </button>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/auth"
            className="text-[#EF3A55] font-semibold hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;
