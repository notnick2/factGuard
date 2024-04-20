"use client";
import "../../globals.css";
import { signIn, signOut, useSession } from 'next-auth/react'
import SidebarItem from "./item";
import { useRouter } from 'next/navigation'


interface ISidebarItem {
  name: string;
  path: string;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

import { useState } from "react";

const items: ISidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
   // icon: LayoutDashboard,
  },
  {
    name: "History",
    path: "/dashboard/History",
    //icon: BadgeDollarSign,
  },
  {
    name: "+ new video",
    path: "/dashboard/newVideo"
  }
     
];

const Sidebar = () => {
  const [theme, setTheme] = useState('dark'); // Default theme is set to dark
  const session = useSession();
  const router = useRouter();
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Toggle between light and dark themes
  };

  const handleSignout = async () => {
      await signOut();
      
  }
  if(session.status === "unauthenticated"){
    router.push("/");
  }

  return (
    <div className={`fixed top-0 left-0 h-screen w-64 ${theme} shadow-lg z-10 p-4 flex flex-col justify-between`}>
      <div>
        <div className="flex justify-center pb-10">
          <h1 className="text-3xl font-bold ">
            Fact<span className="text-[#8DECB4]">Guard</span>
          </h1>
        </div>
        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>
      <div>
        {/* Light Mode / Dark Mode Toggle */}
        <div className="flex justify-between mb-4">
        <button
              className="nav-link nav-link hover:text-[#8DECB4] duration-300 transition-all ease-in-out"
              onClick={toggleTheme}
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
        </div>
        {/* Signout Button */}
        <button onClick={handleSignout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full">
          Sign Out
        </button>
      </div>
    </div>
  );

};
export default Sidebar;
