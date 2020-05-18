import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  state = { advice: '', isLoading: false };

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    this.setState({ isLoading: true })
    axios.get('https://api.adviceslip.com/advice')
    .then((response) => {
      const { advice } = response.data.slip;
      this.setState({ advice })
      this.setState({ isLoading: false })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { advice } = this.state;
    
    return(
      <div className="app">
        <div className="card">
    <h1 className="heading">{this.state.isLoading ? 'Please wait, new advice is loading...' : advice}</h1>
    <button className="button" onClick={this.fetchAdvice}>
      <span>GIVE ME ADVICE!</span>
    </button>
        </div>
      </div>
    )
  }
}

export default App;