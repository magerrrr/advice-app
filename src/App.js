import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Loader from './Loader';

function App() {
  const [advice, setAdvice] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    setIsLoading(true);
    axios.get('https://api.adviceslip.com/advice')
    .then((response) => {
      const { advice } = response.data.slip;
      setAdvice(advice);
      setIsLoading(false);
    })
  }
  return(
    <div className="app">
      <div className="card">
        {isLoading
        ? <Loader />
        : (
          <>
            <h1 className="heading">{advice}</h1>
            <button className="button" onClick={fetchAdvice}>
              <span>GIVE ME ADVICE!</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default App;