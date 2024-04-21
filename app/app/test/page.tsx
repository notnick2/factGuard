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

const App = ({data}) => {

  return (
    <div className='bg-gray-100'>
    <div className="container mx-auto bg-gray-100">
      {data.map((item, index) => (
        <div key={index}>
          <div className="flex items-center mb-4">
            <div className={`h-4 w-4 rounded-full ${item.fact ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
            <p className="text-lg font-semibold">{item.fact ? 'Factually accurate' : 'Factually inaccurate'}</p>
          </div>
          <p className="text-gray-700 mb-4">{item.answer}</p>
          <div className="flex flex-wrap">
            {item.results.map((result, i) => (
              <Card key={i} title={result.title} url={result.url} onClick={() => window.open(result.url, "_blank")} />
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default App;
