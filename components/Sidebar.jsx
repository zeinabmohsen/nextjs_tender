import Link from 'next/link';
import React from 'react';
import { RxDashboard, RxPerson, RxSketchLogo } from 'react-icons/rx';
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlinePlace } from "react-icons/md";
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FiSettings } from 'react-icons/fi';
import dynamic from "next/dynamic";


const Sidebar = ({ children }) => {
  return (
    <div className='flex'>
      <div className='fixed w-20 h-screen p-4 bg-[#019874] border-r-[2px] flex flex-col justify-between'>
        <div className='flex flex-col items-center'>
          <Link href='/'>
            <p className='bg-[#99DFBD] text-white p-3 rounded-lg inline-block'>
              <RxSketchLogo size={20} />
            </p>
          </Link>

          <span className='border-b-[2px] border-gray-200 w-full p-2'></span>

          <Link href='/'>
            <p className='bg-[#99DFBD] hover:bg-gray-300 text-black cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <RxDashboard size={20} />
            </p>
          </Link>

          <Link href='/place'>
            <p className='bg-[#99DFBD] hover:bg-gray-300 text-black cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <MdOutlinePlace size={20} />
            </p>
          </Link>

          <Link href='/doctor'>
            <p className='bg-[#99DFBD] hover:bg-gray-300 text-black cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <FaUserDoctor size={20} />
            </p>
          </Link>

          <Link href='/community'>
            <p className='bg-[#99DFBD] hover:bg-gray-300 text-black cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <IoChatbubblesOutline size={20} />
            </p>
          </Link>

          <Link href='/'>
            <p className='bg-[#99DFBD] hover:bg-gray-300 text-black cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <FiSettings size={20} />
            </p>
          </Link>

        </div>

      </div>

      <main className='ml-20 w-full'>{children}</main>

    </div>
  );
};

export default dynamic (() => Promise.resolve(Sidebar), {ssr: false})



