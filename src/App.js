import React, { Component } from 'react'
import './App.css'

import ProductItem from './ProductItem.js'
import AddProduct from './AddProduct.js'

const products = [
  {
    name: 'iPhone 7',
    price: 600
  },
  {
    name: 'iPhone 6',
    price: 200
  }
]

localStorage.setItem('products', JSON.stringify(products))

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    }

    this.onAdd = this.onAdd.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onEditSubmit = this.onEditSubmit.bind(this)
  }

  componentDidMount(){
    const products = this.getProducts()
    this.setState({ products })
  }

  getProducts(){
    return this.state.products
  }

  onAdd(name, price){
    const products = this.getProducts()
    products.push({ name, price })
    this.setState({ products })
  }

  onDelete(name){
    const products = this.getProducts()
    const filteredProduct = products.filter(product => {
      return product.name !== name
    })

    this.setState({ products: filteredProduct })
  }

  onEditSubmit(name, price, originalName){
    let products = this.getProducts()
    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name
        product.price = price
      }

      return product
    })

    this.setState({ products })
  }

  render(){
    return (
      <div className="App">
        <h1>Product Manager</h1>
        <AddProduct
          onAdd = {this.onAdd}
        />
        {
          this.state.products.map(product => {
            return (
              <ProductItem
                key = {product.name}
                {...product}
                onDelete = {this.onDelete}
                onEditSubmit = {this.onEditSubmit}
              />
            )
          })
        }
      </div>
    )
  }
}

export default App
