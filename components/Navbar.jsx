import dynamic from "next/dynamic";
import Link from 'next/link';
import Header from "./Header";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'; // Import the useRouter hook
import { logout } from '../redux/action/authAction'; 

const Navbar = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter(); // Initialize the useRouter hook
  
    const handleLogout = async () => {
      await dispatch(logout());
      router.push("/login");
    };
  
  return (
    <div>
    <nav className="bg-[#019874] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Title */}
        <Link href="/">
          <div className="text-xl font-bold hover:text-gray-200">tenderTouch</div>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <Link href="/calendar">
              <div className="hover:text-gray-200">Calendar</div>
            </Link>
          </li>
          <li>
            <Link href="/schedule">
              <div className="hover:text-gray-200">Schedule</div>
            </Link>
          </li>
          {/* <li>
            <Link href="/parents">
              <div className="hover:text-gray-200">Parents</div>
            </Link>
          </li> */}
          <li>
            <Link href="/drprofile">
              <div className="hover:text-gray-200">Profile</div>
            </Link>
          </li>
          <button onClick={handleLogout} className="pl-2 pr-2 rounded-full hover:bg-[#99DFBD] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
        Logout
      </button>
        </ul>
      </div>
    </nav>
    <main className=' w-full'>{children}</main>

</div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });

