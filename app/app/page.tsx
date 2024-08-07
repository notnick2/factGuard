"use client"

import React from "react";
import { useState } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
    const[link, set_link] = useState("");
    const [theme, setTheme] = useState('black');
    const session = useSession();
    console.log(session)
    const router = useRouter()
    const toggleTheme = () => {
      setTheme(theme === 'white' ? 'black' : 'white');
    };
    const submit_link=async()=>{
      if(session.status==="authenticated"){
        const response = await axios.post("http://localhost:8000/api/guard-the-fact",{url:link})
        console.log(response.data)
      }
      if(session.status==="unauthenticated"){
        router.push("/signin")
      }
    }
    if(session.status==="loading"){
      return <h2>loading</h2>
    }
    if(session.status==="authenticated"){
      return (
        <div className={`h-screen flex flex-col bg-[#181b2b]`}>
          
          <header className="navbar flex justify-around items-center p-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                Fact<span className="text-[#8DECB4]">Guard</span>
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <button
                className="nav-link nav-link hover:text-[#8DECB4] duration-300 transition-all ease-in-out"
                onClick={toggleTheme}
              >
                {theme === 'white' ? 'white' : 'black'}
              </button>
              <button onClick={async()=>await signOut()} className="nav-link hover:text-[#8DECB4] duration-300 transition-all ease-in-out">
              <img src={session.data.user.image} className="w-12 rounded-full border-[#8DECB4] border-2"></img>
              </button>
            </div>
          </header>
         

          <main className="flex-grow flex justify-center items-center">
            <div className="max-w-md space-y-8">
              <h1 className="text-4xl font-bold text-center mb-4 text-[#8DECB4]">
                Video Content Factual Verification
              </h1>
              <p className="text-xl text-white opacity-70 text-center mb-4">
                Enter your YouTube video's link below to quickly start accuracy
                assessment
              </p>
              
              <div className="flex flex-row items-center">
                <input
                  type="text"
                  className="p-2 flex-1 mt-8 mr-4 w-full border-[#8DECB4] border-b bg-transparent outline-none text-[#8DECB4] text-center font-mono focus:border-b-2 duration-300 transition-all ease-in-out"
                  placeholder="Enter URL of YouTube video..."
                  name="url"
                  value={link}
                  onChange={(e) => { set_link(e.target.value) }}
                  required
                />
                <button
                  onClick={submit_link}
                  className="bg-[#181b2b] border-[#8DECB4] border-2 text-white px-4 py-2 mt-8 rounded hover:bg-[#8DECB4] hover:text-black duration-300 transition-all ease-in-out"
                >
                  Check Facts
                </button>
              </div>


            </div>
          </main>
        </div>
      );}
      if(session.status==="unauthenticated"){
        return (
          <div className={`h-screen flex flex-col bg-[#181b2b]`}>
            
            <header className="navbar flex justify-around items-center p-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">
                  Fact<span className="text-[#8DECB4]">Guard</span>
                </h1>
              </div>
              <div className="flex items-center space-x-6">
                <button
                  className="nav-link nav-link hover:text-[#8DECB4] duration-300 transition-all ease-in-out"
                  onClick={toggleTheme}
                >
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
                <button onClick={()=>router.push("/signin")} className="nav-link hover:text-[#8DECB4] duration-300 transition-all ease-in-out ">
                  Login
                </button>
                <button onClick={()=>router.push("/signup")} className="nav-link hover:text-[#8DECB4] duration-300 transition-all ease-in-out">
                  Get Started
                </button>
              </div>
            </header>
           
  
            <main className="flex-grow flex justify-center items-center">
              <div className="max-w-md space-y-8">
                <h1 className="text-4xl font-bold text-center mb-4 text-[#8DECB4]">
                  Video Content Factual Verification
                </h1>
                <p className="text-xl text-white opacity-70 text-center mb-4">
                  Enter your YouTube video's link below to quickly start accuracy
                  assessment
                </p>
                
                <div className="flex flex-row items-center">
                  <input
                    type="text"
                    className="p-2 flex-1 mt-8 mr-4 w-full border-[#8DECB4] border-b bg-transparent outline-none text-[#8DECB4] text-center font-mono focus:border-b-2 duration-300 transition-all ease-in-out"
                    placeholder="Enter URL of YouTube video..."
                    name="url"
                    value={link}
                    onChange={(e) => { set_link(e.target.value) }}
                    required
                  />
                  <button
                    onClick={submit_link}
                    className="bg-[#181b2b] border-[#8DECB4] border-2 text-white px-4 py-2 mt-8 rounded hover:bg-[#8DECB4] hover:text-black duration-300 transition-all ease-in-out"
                  >
                    Check Facts
                  </button>
                </div>
  
  
              </div>
            </main>
          </div>
        );
      }
}