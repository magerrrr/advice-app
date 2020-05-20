import React, { useState } from 'react';
import './App.css';

function App() {
  const [advice, setAdvice] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  const ADVICE_ID_MIN = 1;
  const ADVICE_ID_MAX = 217;

  const btnClasses = `waves-effect waves-light btn-small ${isLoading && 'btn disabled'}`;
  
  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // We need to validate id of advices, because 22,48,67 are bad values in API
  const validateRandomMumber = number => [22,48,67].includes(number) ? 1 : number; 

  const fetchAdvice = () => {
    setIsLoading(true);

    const randomNumber = getRandomNumber(ADVICE_ID_MIN, ADVICE_ID_MAX);
    const adviceId = validateRandomMumber(randomNumber);

    fetch(`https://api.adviceslip.com/advice/${adviceId}`)
    .then(res => res.text())
    .then(text => JSON.parse(`${text}}`))
    .then(obj => {
      const {advice} = obj.slip;
      setAdvice(advice);
      setIsLoading(false);
    })
  }

  useState(() => {
    fetchAdvice();
  }, [])

  return(
    <div className="app">
      <div className="card">
        <h1 className="heading">{isLoading ? '' : advice}</h1>
        <a href="/#" className={btnClasses} onClick={fetchAdvice}>Give me advice</a>
      </div>
    </div>
  )
}

export default App;