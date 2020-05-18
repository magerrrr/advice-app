import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

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
        {isLoading ? (
        <>
          <div class="preloader-wrapper small active">
            <div class="spinner-layer spinner-red-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </>
        ) : (
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