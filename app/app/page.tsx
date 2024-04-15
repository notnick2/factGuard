"use client"
import Image from "next/image";
import React from "react";
import { useState } from "react";
import axios from "axios";



export default function Home() {

  const [link, set_link] = useState("");

const submit_link=async()=>{
  const response = await axios.post("http://localhost:8000/api/guard-the-fact",{url:link})
  console.log(response.data)
}

  return (
    <>
    <nav className="flex flex-row justify-around p-10">
      <div className="logo flex items-center">
      <span className="text-gray-500 font-semibold text-3xl">fact</span>
      <span className="text-white font-bold text-3xl">Guard</span>
    </div>
    <div>
    <div className="flex flex-row items-center justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
        Login
      </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
    </div>
    </div>
    
</nav>
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        name="inputField"
        placeholder="Input Field"
        value={link}
        onChange={(e)=>{set_link(e.target.value)}}
        className="border text-black border-gray-400 px-4 py-2 mb-4 rounded"
      />
      <button
      onClick={submit_link}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
    </>

 
  );
}
