import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import NoWeb3 from './NoWeb3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: false,
      account: null,
    };
  }
  async componentDidMount() {
    const web3 = new Web3(window.ethereum)
    if(window.ethereum){
      this.setState({web3: true})
    }
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const res = await fetch("/challenge",{ 
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        account: accounts[0]
      })
    })
    const msg = await res.json()
    const signature = await web3.eth.personal.sign(msg.code, accounts[0]);
    document.getElementById('username').account = accounts[0];
    document.getElementById('signature').account = signature;
    document.getElementById('challenge').account = msg.code;
    document.getElementById('form').submit();
  }

  render() {
    return (
      <div className="App">
        <div className="Ethereum-image">
          <img src={require('./Ethereum_logo_2014.svg')}/>
        </div>
        { this.state.account 
          ? <div className="Account-name">
              {this.state.account}
            </div>
          : this.state.web3
            ? <div className="Instructions">
                Select an Account
              </div>
            : <NoWeb3/>
        }
        <form action="/login" method="post" id="form" hidden>
          <div>
            <input type="text" name="username" id="username"/><br/>
          </div>
          <div>
            <input type="text" name="challenge" id="challenge"/>
          </div>
          <div>
            <input type="password" name="signature" id="signature"/>
          </div>
          <div>
            <input type="submit" account="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
 
export default App;
