"use client"

import React from "react";
import { useState } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
    const[link, set_link] = useState("");
    const [theme, setTheme] = useState('light');
    const session = useSession();
    console.log(session)

    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const submit_link=async()=>{
        const response = await axios.post("http://localhost:8000/api/guard-the-fact",{url:link})
        console.log(response.data)
      }

      return (
        <div className={`h-screen flex flex-col ${theme}`}>
          
          <header className="navbar flex justify-around items-center p-4">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">
                Fact<span className="text-blue-500">Guard</span>
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <button
                className="nav-link hover:text-blue-500"
                onClick={toggleTheme}
              >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
              <button onClick={()=>signIn("google")} className="nav-link hover:text-blue-500">
                Login
              </button>
              <button onClick={()=>signIn("google")} className="nav-link hover:text-blue-500">
                Get Started
              </button>
            </div>
          </header>
         

          <main className="flex-grow flex justify-center items-center">
            <div className="max-w-md space-y-4">
              <h1 className="text-4xl font-bold text-center mb-4">
                Video Content Factual Verification
              </h1>
              <p className="text-xl text-gray-700 text-center mb-4">
                Enter your YouTube video's link below to quickly start accuracy
                assessment...
              </p>
              
              <div className="input-container flex flex-row items-center px-4 py-2">
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 flex-1 mr-4 w-full"
                  placeholder="Enter URL of YouTube video..."
                  name="url"
                  value={link}
                  onChange={(e) => { set_link(e.target.value) }}
                  required
                />
                <button
                  onClick={submit_link}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Check Facts
                </button>
              </div>


            </div>
          </main>
        </div>
      );
}