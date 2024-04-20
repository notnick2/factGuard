"use client"

import React from 'react';

function YouTubeVideo() {
  return (
    <div>
      {/* YouTube iframe */}
      <iframe
        width="480"
        height="270"
        src="https://www.youtube.com/embed/yefgBA1CecI?modestbranding=1&controls=0"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default YouTubeVideo;
