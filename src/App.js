import React, { useState } from 'react';
import './App.css';

function App() {
  const ADVICE_ID_MIN = 1;
  const ADVICE_ID_MAX = 217;
  const BAD_IDs = [22,48,67];
  
  const [advice, setAdvice] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [showedAdvices, setShowedAdvices] = useState(new Set(BAD_IDs));
  const btnClasses = `waves-effect waves-light btn-small ${isLoading && 'btn disabled'}`;
  
  const addAdvice = id => setShowedAdvices( showedAdvices => new Set([...showedAdvices, id]));

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const fetchAdvice = (id) => {
    setIsLoading(true);
    fetch(`https://api.adviceslip.com/advice/${id}`)
    .then(res => res.text())
    .then(text => JSON.parse(`${text}}`))
    .then(obj => {
      const {advice} = obj.slip;
      setAdvice(advice);
      setIsLoading(false);
    })
  }

  const getNewAdvice = () => {
    if (showedAdvices.size < ADVICE_ID_MAX) {
      const randomNumber = getRandomNumber(ADVICE_ID_MIN, ADVICE_ID_MAX);
      if (!showedAdvices.has(randomNumber)) {
        addAdvice(randomNumber)
        fetchAdvice(randomNumber);
      } else {
        addAdvice(randomNumber);
        if (showedAdvices.size === ADVICE_ID_MAX - 1){
          setAdvice('WOW! You are awesome! You got all advices for today! Come back tomorrow!');
          setIsLoading(true);
        } else {
          getNewAdvice();
        }
      }
    }
  };

  useState(() => {
    getNewAdvice();
  }, []);

  return(
    <div className="app">
      <div className="card">
        <h1 className="heading">{advice}</h1>
        <a href="/#" className={btnClasses} onClick={getNewAdvice}>Give me advice</a>
      </div>
    </div>
  )
}

export default App;