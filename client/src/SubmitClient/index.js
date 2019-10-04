import React, { Component } from 'react';
import Web3 from 'web3';
import './index.css';

const domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
];

const submission = [
    { name: "name", type: "string" },
    { name: "clientSecret", type: "string" },
    { name: "callbackUrl", type: "string" },
];

const domainData = {
    name: "Add new Contract",
    version: "1",
};

class SubmitClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: false,
      account: null,
    };
  }

  componentDidMount (client) {
    console.log("mounted")
    if (this.props.defaultClient) {
      document.getElementById('name').value = this.props.defaultClient.name || "";
      document.getElementById('clientSecret').value = this.props.defaultClient.clientSecret || "";
      document.getElementById('callbackUrl').value = this.props.defaultClient.callbackUrl || "";
    }
  }

  async onSubmit(event) {
    event.preventDefault()
    const web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts()
    const signer = accounts[0]
    var message = {
      name: document.getElementById('name').value,
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
      await fetch("/addclient",{ 
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
      if(this.props.onSubmit){
        this.props.onSubmit()
      }
    }.bind(this))
  }

  render() {
    return (
      <div className="SubmitClient">
        <form onSubmit={(event) => this.onSubmit(event)} id="form" class="form">
          <div class="header">Edit entry</div>
          <label for="name" class="form-label">name</label>
          <input type="text" name="name" id="name" class="submission-input"/>
          <label for="clientSecret" class="form-label">Client Secret</label>
          <input type="text" name="clientSecret" id="clientSecret" class="submission-input"/>
          <label for="callbackUrl" class="form-label">Callback Url</label>
          <input type="text" name="callbackUrl" id="callbackUrl" class="submission-input"/>
          <input type="submit" value="Submit" class="submission-input"/>
        </form>
      </div>
    );
  }
}
 
export default SubmitClient;
