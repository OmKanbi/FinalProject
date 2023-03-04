import React, { Component } from 'react';
import Header from '../Header';

const pourl = "https://mtw.onrender.com/cart"
const placeOrder = "https://mtw.onrender.com/placeorder"

class PlaceOrder extends Component {
    constructor(props) {
        super(props)
        
        if (sessionStorage.getItem('ltk') == null) {
            console.log('login first')
        } else {
            let userData = JSON.parse(sessionStorage.getItem('userInfo'))
            this.state = {
                id: Math.floor(Math.random() * 10000),
                name: userData.name,
                email: userData.email,
                waist: userData.waist,
                inseam: userData.inseam,
                chest: userData.chest,
                cost: 0,
                phone: userData.phone,
                address: '',
                Item: ''
            }
        }

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    checkout = () => {
        let obj = this.state
        obj.Item = sessionStorage.getItem('Item');
        fetch(placeOrder, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(console.log('order added'))
            .then(this.props.history.push('/viewBooking'))
    }


    renderItem = (data) => {
        if (data) {
            return data.map((item) => {
                return (
                    <div key={item._id}>
                        <img src={item.Image} alt={item.product_name} />
                        <h3>{item.product_name}</h3>
                    </div>
                )
            })
        }
    }

    render() {


        if (sessionStorage.getItem('ltk') == null) {
            return (
                <>
                    <Header />
                    <center class='lr-wrapper'>
                        <h2>Login First To Place Booking</h2>
                    </center>
                </>
            )
        }
        return (
            <>
                <Header />
                <div class="lr-wrapper">
                    <h1>Shopping Cart</h1>
                    <form action="http://localhost:4100/paynow" method="POST" class="lr-content">
                        <input type="hidden" name="cost" value={this.state.cost} />
                        <input type="hidden" name="id" value={this.state.id} />
                        <input id="fname" name="name" placeholder='name' value={this.state.name} onChange={this.handleChange} />
                        <input id="email" name="email" placeholder='email' value={this.state.email} onChange={this.handleChange} />
                        <input id="phone" name="phone" placeholder='phone no.' value={this.state.phone} onChange={this.handleChange} />
                        <input id="address" name="address" placeholder='address' value={this.state.address} onChange={this.handleChange} />
                        {this.renderItem(this.state.Item)}
                        <h2>Total Price is ${this.state.cost}</h2>
                        <button className='btn btn-success' onClick={this.checkout} type="submit">Checkout</button>
                    </form>
                </div>
            </>
        )
    }

    componentDidMount() {
        let productId = JSON.parse(sessionStorage.getItem('Item'))
        fetch(pourl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productId)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                let totalPrice = 0;
                data.map((item) => {
                    totalPrice = totalPrice + parseFloat(item.Price);
                    return 'ok'
                })

                this.setState({ Item: data, cost: totalPrice })
            })
    }

}

export default PlaceOrder