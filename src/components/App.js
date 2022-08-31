import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3'
import Marketplace from '../abis/Marketplace.json'
import Main from './Main';

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
      const productCount = await marketplace.methods.productCount().call()
      this.setState({productCount});
      for(var i =1 ; i<= productCount; i++)
      {
        const product = await marketplace.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product]
        })

       
      }
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

    this.createProduct = this.createProduct.bind(this);
  }
  createProduct(name,price){
  
    this.setState({loading: true});
    this.state.marketplace.methods.createProduct(name, price).send({from: this.state.account}).once('reciept', (reciept) =>{
      this.setState({loading: false })
    })
  }
  render() {
    return (
      <div>
        <div>
          {
            this.state.account
          }
        </div>
        {
          this.state.loading ? "Loading " : <Main products={this.state.products} createProduct={this.createProduct}/>
        }
      </div>
      
      
    );
  }
}

export default App;
