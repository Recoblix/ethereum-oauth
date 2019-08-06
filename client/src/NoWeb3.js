import React, { Component } from 'react';
import './NoWeb3.css';

class App extends Component {
  render() {
    return (
      <div className="NoWeb3">
        <div className="Instructions">
          Install a Web3 Browser
        </div>
        <div className="Metamask-button">
          <img src={require('./metamask.png')} className="Metamask-image"/>
          <div className="Metamask-text">
            Download Metamask
          </div>
          <a href="https://metamask.io/"></a>
        </div>
      </div>
    );
  }
}
 
export default App;
