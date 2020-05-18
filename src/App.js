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
          {this.state.isLoading ? (
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
              <button className="button" onClick={this.fetchAdvice}>
                <span>GIVE ME ADVICE!</span>
              </button>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default App;