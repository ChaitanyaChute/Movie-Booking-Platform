import { Link } from "react-router";
import { assets } from "../assets/assets";
import { Search, UserRound } from "lucide-react";
import { useState } from "react";
import ProfileComponent from "./ProfileComponent";

interface NavBarProps {
  isLoggedIn: boolean;
  logout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, logout }) => {
  const [dialogueBox, setDialogueBox] = useState(false);

  function profileFunction() {
    setDialogueBox((prev) => !prev);
    
  }

  return (
    <div className="flex items-center justify-between fixed top-5 left-0 w-full pl-30 pr-40 font-light z-50">
      <div>
        <img
          src={assets.logo}
          width={200}
          alt="Logo"
          className="cursor-pointer"
        />
      </div>
      <div className="border-2 px-5 py-3 rounded-full backdrop-blur bg-black-70/20 border-gray-300/20 flex gap-10 font-light text-sm cursor-pointer ">
        <Link to="/">Home </Link>
        <Link to="/movies">Movies</Link>
        <Link to="*">Theaters</Link>
        <Link to="#">Releases</Link>
      </div>

      <div className="flex mx-1 gap-10 items-center">
        <div className="items-center">
          <Search className="h-8" />
        </div>

        {isLoggedIn ? (
          <div>
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
