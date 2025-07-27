import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


interface logoutfuncprops{
    logoutfunc:()=>void
}

const ProfileComponent: React.FC<logoutfuncprops>  = ({ logoutfunc }) => {
  const navigate = useNavigate();
  const handleMyBookings = () => navigate('/bookings');
 
  const handleLogout = async() => {
    console.log('Logging out...');

    await localStorage.removeItem("token");
    toast.success("Logout Sucessfully")
    logoutfunc();
    navigate('/');
  };

  return (
    <div className="w-60 max-w-sm p-6 bg-[#1A1A1C] rounded-lg shadow-xl border border-[#2a2a2b] mr-5">
      {/* <div className="flex flex-col items-center mb-6">
        <img
          src=""
          alt="ProfilePic"
          className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-[#EF3A55]"
        />
        <h3 className="text-lg font-semibold text-white">Hello , UserName</h3>
      </div> */}

      <div className="space-y-3">
        <button
          onClick={handleMyBookings}
          className="w-full text-left text-gray-300 hover:bg-[#2A2A2B] px-4 py-2 rounded transition"
        >
          My Bookings
        </button>
        <button
          onClick={handleLogout}
          className="w-full text-left text-[#EF3A55] hover:bg-[#2A2A2B] px-4 py-2 rounded font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileComponent;
