"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Full from '@/app/test/page';
import App from '@/app/test/page';

import TypingEffect from "./typingEffect";

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



const ListItem = ({ item, typingSpeed }) => {

  const contentWithBullet = `• ${item}`;
    return (  
      <TypingEffect content={contentWithBullet} typingSpeed={typingSpeed} />
    );
  };




const Content = () => {

    const [transcriptionState, setTranscriptionState] = useState('Transcribing video...');
    const [transdone, setTransdone ] = useState<any>(null);
    const [listing, setListing] = useState<any>(null);
    const [list, setList] = useState([]);
    const [apiObject, setApiObject] = useState<ResultType[]>([]);

    const [videoId, setVideoId] = useState('HEH3qLofMaU');
    const typingSpeed = 60;

    const requestBody = { video_id: 'HEH3qLofMaU' };

    useEffect(() => {
      const fetchData = async () => {
        try {
          await simulateTranscription();        
          setTransdone('Video transcription done');
          setListing('Listing out information mentioned in the video...');
          const responseList = await axios.post('http://localhost:5000/generate-response', requestBody, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log(responseList.data);
          console.log(typeof(responseList.data));
          setList(responseList.data);
          
          
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchData();
    }, []);
  
    useEffect(()=>{
      const fetchData = async () => {
      console.log(list);
      console.log(list.length);
      for (let i = 0; i < 1; i++) {
        try {
          const response = await axios.get('http://localhost:5000/process');
          const result = response.data; 
          console.log(result)
          setApiObject(prevData => [...prevData, result]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } 
    };
    fetchData();
    },[list]);


    const simulateTranscription = () => {
      return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 1001) + 4000; // Random delay between 2 to 3 seconds
        setTimeout(resolve, delay);
      });
    };


    return (
        <div>
        <TypingEffect content={transcriptionState} typingSpeed={typingSpeed} />
        {transdone !== null && <TypingEffect content={transdone} typingSpeed={typingSpeed} />}
        {listing !== null && <TypingEffect content={listing} typingSpeed={typingSpeed} />}
       <ul>
        {list.map((item, index) => (
          <ListItem key={index} item={item} typingSpeed={typingSpeed} />
        ))}
      </ul>
      <div>
      {apiObject.length > 0 ? <App results={apiObject} /> : <p>Loading...</p>}
    </div>
    </div>
    );
};    

export default Content;