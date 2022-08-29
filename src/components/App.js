import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3'
import Marketplace from '../abis/Marketplace.json'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]});
    const networkId = await web3.eth.net.getId();
    const abi = Marketplace.abi;
    const networkData  = Marketplace.networks[networkId];
    if(networkData){
      const marketplace = web3.eth.Contract(abi, networkData.address);
      this.setState({marketplace})
      this.setState({loading:false})
    }
    else{
 window.alert("Not deployed on network")
    }
    
    
  }
  constructor(props){
    super(props)
    this.state = {
      account : "",
      productCount : 0,
      products : [],
      loading: true
    }
  }
  render() {
    return (
      <div>
        {this.state.account}
        <div>
          <div>{this.state.loading ?  "loading ....." : "AddProduct"}</div>
        </div>
        <form>
          <input placeholder='product name' />
          <input placeholder='price'/>
          <button>Submit</button>
        </form>

        <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Owner</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <button>Buy</button>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>


      </div>
    );
  }
}

export default App;
