"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewVideo = () => {
  const [link, setLink] = useState("");
  const router = useRouter();


  const submitLink = () => {
    const parts = link.split("=");
    const videoId = parts[1];
    router.push(`/dashboard?v=${videoId}`)
    // You can implement your logic for checking facts here
  }

  return (
    <main className="flex-grow flex justify-center items-center -mt-[100px]">
      <div className="max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center mb-4 text-[#8DECB4]">
          Video Content Factual Verification
        </h1>
        <p className="text-xl text-[var(--text-color)] opacity-70 text-center mb-4">
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
            onChange={(e) => setLink(e.target.value)}
            required
          />
          <button
            onClick={submitLink}
            className="bg-[#181b2b] border-[#8DECB4] border-2 text-white px-4 py-2 mt-8 rounded hover:bg-[#8DECB4] hover:text-black duration-300 transition-all ease-in-out"
          >
            Check Facts
          </button>
        </div>
      </div>
    </main>
  );
}

export default NewVideo;
