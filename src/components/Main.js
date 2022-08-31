import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3'
import Marketplace from '../abis/Marketplace.json'

class Main extends Component {

  
  render() {
    return (
      <div id='content'>
        <form onSubmit={(event) =>{
          event.preventDefault(); 
          const name = this.productName.value;
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), "Ether");

          this.props.createProduct(name, price)
        }}>
          <div className='form-group mr-sm-2'>
          <input
          id='productName'
          type="text"
          className='form-control'
          ref={(input) => {this.productName = input}} 
          placeholder='product name' />
          <input
          id='productPrice'
          type="text"
          className='form-control'
          ref={(input) => {this.productPrice = input}} 
          placeholder='Price' />
          </div>
          
          
          <button type='submit' className='btn btn-primary'>Add Product</button>
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

export default Main;
