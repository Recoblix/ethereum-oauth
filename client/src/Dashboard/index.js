import React, { Component } from 'react';
import Web3 from 'web3';
import './index.css';

const domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
];

const submission = [
    { name: "name", type: "string" },
    { name: "clientId", type: "string" },
    { name: "clientSecret", type: "string" },
    { name: "callbackUrl", type: "string" },
];

const domainData = {
    name: "Add new Contract",
    version: "1",
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: false,
      account: null,
    };
  }

  async onSubmit(event) {
    event.preventDefault()
    const web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts()
    const signer = accounts[0]
    var message = {
      name: document.getElementById('name').value,
      clientId: document.getElementById('clientId').value,
      clientSecret: document.getElementById('clientSecret').value,
      callbackUrl: document.getElementById('callbackUrl').value, 
    }
    const data = JSON.stringify({
      types: {
        EIP712Domain: domain,
        Submission: submission,
      },
      domain: domainData,
      primaryType: "Submission",
      message: message
    });
    web3.currentProvider.sendAsync({
      method: "eth_signTypedData_v3",
      params: [signer, data],
      from: signer
    },
    async function(err, result) {
      console.log(result)
      const res = await fetch("/addclient",{ 
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          signature: result.result,
          message,
          signer,
        })
      })
    })
  }

  render() {
    return (
      <div className="Dashboard">
        <form onSubmit={this.onSubmit} id="form">
          <div>
            <input type="text" name="name" id="name"/>
          </div>
          <div>
            <input type="text" name="clientId" id="clientId"/>
          </div>
          <div>
            <input type="text" name="clientSecret" id="clientSecret"/>
          </div>
          <div>
            <input type="text" name="callbackUrl" id="callbackUrl"/>
          </div>
          <div>
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    );
  }
}
 
export default Dashboard;
