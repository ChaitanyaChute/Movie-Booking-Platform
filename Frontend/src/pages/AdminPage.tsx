import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation, Outlet, Link } from "react-router";
import { Film, LogOut, LayoutDashboard, PlusCircle, List, Ticket } from "lucide-react";

const AdminPage = () => {
  const Navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Skip verification if coming from successful login
    const fromLogin = location.state?.fromLogin;
    if (fromLogin) {
      // Clear the state so refresh will trigger verification
      window.history.replaceState({}, document.title);
      return;
    }

    const verifyAdmin = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("Please login first");
        Navigate("/auth", { replace: true });
        return;
      }

      // Check localStorage first for quick validation
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.isAdmin === true) {
            // User is marked as admin in localStorage, no need to verify
            return;
          }
        } catch (e) {
          // Invalid JSON, proceed with verification
        }
      }

      try {
        // Verify if the token belongs to an admin
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/verify`,
          {
            headers: {
              token: token
            }
          }
        );

        if (!(response.data as any).isAdmin) {
          toast.error("You are not allowed to enter here. Only admins are allowed.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          Navigate("/", { replace: true });
        } else {
          // Update localStorage with admin status
          const userStr = localStorage.getItem("user");
          if (userStr) {
            const user = JSON.parse(userStr);
            user.isAdmin = true;
            localStorage.setItem("user", JSON.stringify(user));
          }
        }
      } catch (error) {
        toast.error("Invalid session. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Navigate("/auth", { replace: true });
      }
    };

    verifyAdmin();
  }, [Navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    Navigate("/", { replace: true });
  };

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { path: "/admin/add", label: "Add Show", icon: PlusCircle },
    { path: "/admin/shows", label: "Active Shows", icon: List },
    { path: "/admin/bookings", label: "Bookings", icon: Ticket },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F10] via-[#1A1A1C] to-[#0F0F10]">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Film className="text-[#EF3A55]" size={32} />
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1C] text-white rounded-lg hover:bg-[#EF3A55] transition-all duration-200 border border-gray-600 hover:border-[#EF3A55]"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 border-b-2 ${
                    isActive(item.path, item.exact)
                      ? "text-[#EF3A55] border-[#EF3A55]"
                      : "text-gray-400 border-transparent hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
