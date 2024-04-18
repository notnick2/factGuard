"use client"
import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignInPage = () => {
    const session = useSession();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [theme, setTheme] = useState('dark'); // Default theme is set to dark

    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light'); // Toggle between light and dark themes
    };

    const sendData = async () => {
        const response = await axios.post("/api/signin", { email, password });
        console.log(response.data);
    };

    if (session.status === "authenticated") {
        router.push("/dashboard");
    }

    return (
        <div className={`h-screen ${theme}`}>
            <div className="flex flex-col items-center">
                <h1 className="text-[#8DECB4] font-bold text-3xl mt-44">Sign In</h1>
                <input type="email" placeholder="Email" required className="outline-none text-xl w-4/12 mt-20 text-center bg-transparent border-[#8DECB4] border-b-2 text-[#8DECB4] placeholder:text-white placeholder:opacity-60" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" required className="outline-none text-xl w-4/12 mt-12 text-center bg-transparent border-[#8DECB4] border-b-2 text-[#8DECB4] placeholder:text-white placeholder:opacity-60" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={sendData} className="text-xl text-center bg-transparent border-[#8DECB4] border-2 text-white p-2 pr-4 pl-4 rounded mt-12 placeholder:text-white placeholder:opacity-60 w-4/12 hover:bg-[#8DECB4] hover:text-black transition-all ease-in-out duration-300">Sign In</button>
                <p className="mt-4 text-lg">or</p>
                <div className="flex items-center mt-4">
                    <button onClick={() => signIn("google")} className="w-[33.5vw] flex items-center justify-center bg-[#181b2b] border-[#8DECB4] text-white border-2 rounded text-xl p-2 pr-4 pl-4 hover:bg-[#8DECB4] hover:text-black transition-all ease-in-out duration-300">
                        Continue with 
                        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" alt="google" className="w-4 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
