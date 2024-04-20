"use client"
import React from 'react';

const Card = ({ title, url, onClick }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white cursor-pointer hover:bg-gray-100" onClick={onClick}>
      <div className="px-2 py-2">
        <div className="font-bold text-md mb-2">{title}</div>
        <p className="text-gray-700 text-base line-clamp-2">{url}</p>
      </div>
    </div>
  );
};

const App = () => {
  const data = {
    "answer": "Modi did not turn into a monk in 2015. The reports from May 2015 mention Narendra Modi's visit to an ailing 95-year-old monk in Kolkata, Swami Atmasthananda, who had played a significant role in guiding Modi towards politics. Modi's interaction with the monk was more about acknowledging the influence the monk had on his life and career rather than him becoming a monk himself.",
    "fact": true,
    "images": [
      "https://img.etimg.com/thumb/msid-59220256,width-1070,height-580,imgsize-357137,overlay-economictimes/photo.jpg",
      "https://s.yimg.com/uu/api/res/1.2/Wb2swcNLc5ZqzB30KA0wmA--~B/aD0yMTI1O3c9MzUwMDtzbT0xO2FwcGlkPXl0YWNoeW9u/http://media.zenfs.com/en_us/News/Reuters/2015-05-14T071946Z_672952666_GF10000094343_RTRMADP_3_CHINA-INDIA.JPG",
      "https://aniportalimages.s3.amazonaws.com/media/details/modi_meets_monks_1.jpg",
      "https://data1.ibtimes.co.in/en/full/620032/prime-minister-narendra-modi-speaks-media-inside-parliament-premises.jpg",
      "http://static-ai.asianetnews.com/images/01cmcn16nf1nwzpvmy1r8bwxns/Modi-varanasi.jpg"
    ],
    "query": "Modi turned monk in 2015",
    "response_time": 3.85,
    "results": [
      {
        "title": "The link between PM Modi and Ramakrishna Mission, explained",
        "url": "https://www.oneindia.com/india/the-link-between-pm-modi-and-ramakrishna-mission-explained-3012984.html"
      },
      {
        "title": "The monk who changed Narendra Modi's life - Times of India",
        "url": "https://timesofindia.indiatimes.com/india/The-monk-who-changed-Narendra-Modis-life/articleshow/47143664.cms"
      },
      {
        "title": "The Monk Who Changed Narendra Modi's life - Hinduism Today",
        "url": "https://www.hinduismtoday.com/hpi/2015/05/16/the-monk-who-changed-narendra-modi-s-life/"
      },
      {
        "title": "The Swami Who Rejected Modi as a Monk and Inspired Him to Politics",
        "url": "https://www.newindianexpress.com/nation/2015/May/04/the-swami-who-rejected-modi-as-a-monk-and-inspired-him-to-politics-756084.html"
      },
      {
        "title": "Swami Atmasthananda: The monk who changed Narendra Modi's life",
        "url": "https://economictimes.indiatimes.com/news/politics-and-nation/Swami-Atmasthananda-The-monk-who-changed-Narendra-Modis-life/articleshow/47145095.cms"
      }
    ]
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-4">
        <div className={`h-4 w-4 rounded-full ${data.fact ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
        <p className="text-lg font-semibold">{data.fact ? 'Factually accurate' : 'Factually inaccurate'}</p>
      </div>
      <p className="text-gray-700 mb-4">{data.answer}</p>
      <div className="flex flex-wrap">
        {data.results.map((result, index) => (
          <Card key={index} title={result.title} url={result.url} onClick={() => window.open(result.url, "_blank")} />
        ))}
      </div>
    </div>
  );
};

export default App;
