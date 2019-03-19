import React, { Component } from 'react';
import Web3 from 'web3';

class App extends Component {
  async componentDidMount() {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts()
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
    document.getElementById('username').value = accounts[0];
    document.getElementById('password').value = signature;
    document.getElementById('challenge').value = msg.code;
    document.getElementById('form').submit();
  }

  render() {
    return (
      <div className="App">
        <img src={require('./Ethereum_logo_2014.svg')}/>
        <form action="/login" method="post" id="form" hidden>
          <div>
            <input type="text" name="username" id="username"/><br/>
          </div>
          <div>
            <input type="text" name="challenge" id="challenge"/>
          </div>
          <div>
            <input type="password" name="password" id="password"/>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
 
export default App;
