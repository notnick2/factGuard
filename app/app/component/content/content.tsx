"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToBottom from 'react-scroll-to-bottom';
import TypingEffect from "./typingEffect";
import App from '@/app/test/page';
import { boomtha } from '@/app/test/data';
import ScoreBar from './scoreBar';

interface ResultType {
  answer: string;
  fact: boolean;
  follow_up_questions: any[] | null; 
  images: string[];
  query: string;
  response_time: number;
  results: {
    content: string;
    raw_content: any; 
    score: number;
    title: string;
    url: string;
  }[];
}

const Content = () => {
  const [listing, setListing] = useState<string | null>(null);
  const [list, setList] = useState<string[]>([]);
  const [printingIndex, setPrintingIndex] = useState<number>(0); // Track the index of the item currently being printed
  const [score, setScore] = useState<boolean>(false);
  const typingSpeed = 60;

  const requestBody = { video_id: 'HEH3qLofMaU' };

  useEffect(() => {
    const fetchList = async () => {
      try {
        setListing('Listing out information mentioned in the video...');
        const responseList = await axios.post('http://localhost:5000/generate-response', requestBody, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setList(responseList.data);  
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchList();
  }, []);

  useEffect(() => {
    if (printingIndex < list.length) {
      const timeout = setTimeout(() => {
        setPrintingIndex(prevIndex => prevIndex + 1); // Move to the next item
      }, typingSpeed * list[printingIndex].length);

      return () => clearTimeout(timeout);
    }
  }, [printingIndex, list, typingSpeed]);

  return (
    <ScrollToBottom>
      <div>
        {listing && <TypingEffect content={listing} typingSpeed={typingSpeed} bold='font-bold' size='text-xl' />}
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              {index < printingIndex && <TypingEffect content={`• ${item}`} typingSpeed={typingSpeed} bold='font-medium' size='text-md' />}
            </li>
          ))}
        </ul>
        {/* <div>
          {apiObject.length > 0 ? <App data={apiObject} /> : <p>Loading...</p>}
        </div> */}
         <App data={boomtha}/> 
         {score && <ScoreBar list1={list2} list2={list1} />} 
      </div> 
    </ScrollToBottom>
  );
};    

export default Content;
