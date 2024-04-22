import React, { useState, useEffect } from 'react';
import TypingEffect from '../component/content/typingEffect';

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

const App = ({ data }) => {
  const [printingQuery, setPrintingQuery] = useState(false);
  const [printingFact, setPrintingFact] = useState(false);
  const [printingAnswer, setPrintingAnswer] = useState(false);
  const [printingSource, setPrintingSource] = useState(false);

  useEffect(() => {
    if (data && data.query && !printingQuery) {
        setPrintingQuery(true);
    }
  }, [printingQuery, data]);

  useEffect(() => {
    if (data && data.fact && !printingFact) {
      setTimeout(() => {
        setPrintingFact(true);
      }, calculateDelay(data.query));
    }
  }, [printingQuery, data]);

  useEffect(() => {
    if (data && data.answer && !printingAnswer) {
      setTimeout(() => {
        setPrintingAnswer(true);
      }, calculateDelay(data.query+data.fact));
    }
  }, [printingQuery, data]);

  useEffect(() => {
    if(data && data.results && !printingSource) {
      setTimeout(() => {
        setPrintingSource(true);
      }, calculateDelay(data.query+data.fact+data.answer));
    }
  },[printingQuery, data]);

  const calculateDelay = (text) => {
    // Check if text is defined before accessing its length property
    return text ? text.length * 50 : 0;
  };

  return (
    <div className='bg-gray-100'>
      <div className="container mx-auto bg-gray-100">
        <div>
          {printingQuery && <TypingEffect content={data.query} typingSpeed={50} bold='font-bold' size='text-xl' />}
          {printingFact && (
            <div className="flex items-center">
              <div className={`h-4 w-4 rounded-full ${data.fact ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
              <TypingEffect content={data.fact ? 'Factually accurate' : 'Factually inaccurate'} typingSpeed={50} bold='font-semibold' size='text-lg' />            </div>
          )}
          {printingAnswer && <TypingEffect content={data.answer} typingSpeed={50} bold='text-gray-700' size='text-xl' />}
          {printingSource && (
            <>
              <h1 className='text-slate-700 text-2xl ml-2 mt-5 mb-5'>sources</h1>
              <div className="flex flex-wrap">
                {data.results.map((result, i) => (
                  <Card key={i} title={result.title} url={result.url} onClick={() => window.open(result.url, "_blank")} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
