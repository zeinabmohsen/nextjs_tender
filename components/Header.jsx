import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'; // Import the useRouter hook
import { logout } from '../redux/action/authAction'; // Import your logout action

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize the useRouter hook

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/login");
  };

  return (
    <div className='flex justify-between items-center px-4 pt-4'>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <button onClick={handleLogout} className="p-2 rounded-full hover:bg-[#99DFBD] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
        Logout
      </button>
    </div>
  );
};

export default Header;



