import React, { Component } from 'react';
import Web3 from 'web3';
import './index.css';
import SubmitClient from '../SubmitClient';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: false,
      account: null,
      edit: false,
      clients: [],
      defaultClient: {},
    };
  }

  formMounted (callbacks) {
    console.log("formMounted")
    this.formCallbacks = callbacks;
  }

  editClient(client){
    this.setState({defaultClient: client, edit: true});
  }

  
  stopEditing(){
    this.setState({edit: false});
    this.updateClientList();
  }

  async componentDidMount() {
    this.updateClientList();
  }
  async updateClientList() {
    const web3 = new Web3(window.ethereum)
    if(window.ethereum){
      this.setState({web3: true})
    }
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const res = await fetch("/submittersclients",{ 
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        account: accounts[0]
      })
    })
    const msg = await res.json();
    if(msg) this.setState({clients: msg});
  }

  render() {
    var { clients, edit, defaultClient } = this.state
    return (
      <div className="Dashboard">
          <header class="header">Clients</header>
          <ul class="list">
            <div class="label line">
              <div class="name">Name</div>
              <div class="client-id">Client Id</div>
              <div class="client-secret">Client Secret</div>
              <div class="callback-url">Callback Url</div>
              <button class="edit" onClick={()=>this.editClient({})}>Add New</button>
            </div>
            <div class="line"/>
            {clients.map((client) =>
              <li class="line" key={client.name}>
                <div class="name">{client.name}</div>
                <div class="client-id">{client.clientId}</div>
                <div class="client-secret">* * *</div>
                <div class="callback-url">{client.callbackUrl}</div>
                <button class="edit" onClick={()=>this.editClient(client)}>Edit</button>
              </li>
            )}
          </ul>
          {edit && <SubmitClient defaultClient={defaultClient}
                                 onSubmit={()=>this.stopEditing()}/>}
      </div>
    );
  }
}
 
export default Dashboard;
