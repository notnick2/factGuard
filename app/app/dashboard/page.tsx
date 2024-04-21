"use client"
import TypingEffect from "../component/content/typingEffect";
import "../globals.css";
import YouTubeVideo from "../component/content/video";
import Content from "../component/content/content";
import { useSearchParams } from 'next/navigation';
import {useSession } from 'next-auth/react'
import {useRouter} from 'next/navigation'
import { useState, useEffect } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';


const HomePage = () => {
    const searchParams = useSearchParams();
    const session = useSession()
    const router=useRouter()
    const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const typingSpeed = 50;
    const [search, setSearch] = useState('');
    const [link, setLink] = useState('');


    const submitLink = () => {
      const parts = link.split("=");
      const videoId = parts[1];
        setSearch(videoId);
      };
    


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const searchParam = params.get('v');
        if(searchParam!=null){
        setSearch(searchParam);
        }
        else {
          setSearch('none');
        }
      }, []);

      if (search=='none') {
        return (
            <main className="flex-grow flex justify-center items-center">
            <div className="max-w-md space-y-8 -m-10">
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

    if (session.status === "loading") {
        return (
        <div>loading...</div>
      )
      }
      if(session.status==="unauthenticated"){
        router.push("/signup")
      }
      if(session.status==="authenticated"){

    return (
      <ScrollToBottom>
    <div className="m-5 bg-gray-100">
        <div className="flex flex-row ">
            <h1 className="text-3xl font-bold mb-5">
            VIDEO FACTUAL ACCURACY VERIFICATION
            </h1>
        </div>
        <div className="">
            <div className="">
            <YouTubeVideo/>
                <Content/>
            </div>
        
        </div>
    </div>
    <div className="absolute top-5 right-5 z-5">
   {/* <YouTubeVideo/>
    <h1>{search}</h1> */}
    </div>
    </ScrollToBottom>
    );
}
};

export default HomePage;