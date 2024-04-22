"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
/*
function YouTubeVideo() {
  return (
    <div>
     
      <iframe
        width="480"
        height="270"
        src="https://www.youtube.com/embed/yefgBA1CecI?modestbranding=1&controls=0"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <img
            src={videoInfo.thumbnails.high.url}
            alt={videoInfo.title}
            width={videoInfo.thumbnails.medium.width}
            height={videoInfo.thumbnails.medium.height}
          />
    </div>
  );
}

export default YouTubeVideo;
*/


const YouTubeVideo = ({ videoId }) => {
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDaHir2NgtnBInYbQL1QqK9dbPily5E5zI`
        );
        setVideoInfo(response.data.items[0].snippet);
      } catch (error) {
        console.error('Error fetching video information:', error);
      }
    };

    fetchVideoInfo();
  }, [videoId]);

  return (
    <div>
      {videoInfo && (
        <div className='m-2'>
            <iframe
             width="480"
             height="270"
             src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&controls=0`}
             title="YouTube video player"
             frameborder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowfullscreen
            ></iframe>
          <h1 className='text-2xl font-bold mb-3 mt-3 text-slate-800'>{videoInfo.title}</h1>
        </div>
      )}
    </div>
  );
};

export default YouTubeVideo;
