import { Link } from "react-router";
import logo from "/public/logo.svg"
import { Search, UserRound } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ProfileComponent from "./ProfileComponent";

const NavBar: React.FC = () => {
  const [dialogueBox, setDialogueBox] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check login status on mount and storage changes
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    // Listen for storage changes (handles login/logout in other tabs)
    window.addEventListener('storage', checkLoginStatus);
    
    // Custom event for same-tab updates
    window.addEventListener('authChange', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('authChange', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setDialogueBox(false);
      }
    };

    if (dialogueBox) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dialogueBox]);

  function profileFunction() {
    setDialogueBox((prev) => !prev);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setDialogueBox(false);
    // Dispatch custom event for navbar update
    window.dispatchEvent(new Event('authChange'));
    window.location.reload();
  }


  return (
    <div className="flex items-center justify-between fixed top-5 left-0 w-full pl-30 pr-40 font-light z-50">
      <div>
        <img
          src={logo}
          width={200}
          alt="Logo"
          className="cursor-pointer"
        />
      </div>
      <div className="border-2 px-5 py-3 rounded-full backdrop-blur bg-black-70/20 border-gray-300/20 flex gap-10 font-light text-sm cursor-pointer ">
        <Link to="/">Home </Link>
        <Link to="/movies">Movies</Link>
        {/* {isLoggedIn && <Link to="/bookings">My Bookings</Link>} */}
        <Link to="*" >Theaters</Link>
        <Link to="*">Releases</Link>
      </div>

      <div className="flex mx-1 gap-10 items-center">
        <div className="items-center">
          <Search className="h-8" />
        </div>

        {isLoggedIn ? (
          <div ref={profileRef} className="relative">
            <button onClick={profileFunction} className="cursor-pointer">
              <UserRound />
            </button>

            {dialogueBox && (
              <div className="absolute right-0 mt-2">
                <ProfileComponent logoutfunc={logout} />
              </div>
            )}
          </div>
        ) : (
          <div className=" px-4 py-1 rounded-full bg-[#EF3A55] font-semibold">
            <Link to="/auth">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
