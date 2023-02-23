import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header';

const purl = "https://mtw.onrender.com/products/"
class Product extends Component {
    constructor() {
        super()

        this.state={
            product: '',
            productId: sessionStorage.getItem('productId'),
            userItem:''
        }
    }

    addToCart=(data)=>{
        this.setState({userItem:data})
    }

    proceed = () => {
        sessionStorage.setItem('Item',JSON.stringify(this.state.userItem))
        this.props.history.push(`/placeOrder`)
    }

    orderId = [];
    finalOrder = (data) => {this.addToCart(data)}

    placeOrder = (id) => {
        this.orderId.push(id)
        this.finalOrder(this.orderId)
        document.getElementById('msg').innerText = "Item has been added to cart"
    }
    

    removeOrder = (id) => {
        if(this.orderId.indexOf(id) > -1){
            this.orderId.splice(this.orderId.indexOf(id),1)
        }
        this.finalOrder(this.orderId)
        document.getElementById('msg').innerText = "Item has been removed from cart"
    }

    render() {
        let { product } = this.state;
        return (
            <>
            <Header />
                <div key={product.product_id}>
                    <div class="product-wrapper">
                        <div class="product-image">
                            <img src={product.Image} alt={product.category} />
                        </div>
                        <div class="product-info">
                            <h1>{product.product_name}</h1>
                            <p>{product.description}</p>
                            <div class="free-delivery premium">Limited Edition</div>
                            <h2><i class="fa-sharp fa-solid fa-dollar-sign"></i> {product.Price}</h2>                         
                                <button onClick={() => { this.placeOrder(product._id) }} ><i class="fa-solid fa-cart-shopping"></i>&nbsp; Add to cart</button>&nbsp;
                                <button onClick={() => { this.removeOrder(product._id) }}>Remove Item</button>&nbsp;
                                <button onClick={this.proceed}>View Cart</button>
                                <div><p id='msg'></p></div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    componentDidMount() {
        let a = this.props.match.params.productCategory;
        let b = this.props.match.params.productId;
        sessionStorage.setItem('productId', b);
        axios.get(`${purl}${a}/${b}`)
            .then((res) => { this.setState({ product: res.data[0] }) })
    }
}
export default Product;