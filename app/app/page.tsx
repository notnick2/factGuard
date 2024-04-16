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
          
          
              <p className="text-3xl text-white fixed top-1/2 text-center left-1/2">
                Under Construction
              </p>

        </div>
      );
}