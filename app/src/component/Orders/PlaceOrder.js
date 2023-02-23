import React, { Component } from 'react';
import Header from '../Header';

const pourl = "https://mtw.onrender.com/cart"
const placeOrder = "https://mtw.onrender.com/placeorder"

class PlaceOrder extends Component {
    constructor(props) {
        super(props)
        let userData = JSON.parse(sessionStorage.getItem('userInfo'))
        this.state = {
            id: Math.floor(Math.random() * 10000),
            name: userData.name,
            email: userData.email,
            waist : userData.waist,
            inseam : userData.inseam,
            chest : userData.chest, 
            cost: 0,
            phone: userData.phone,
            address: '',
            Item: ''
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
        // .then(this.props.history.push('/viewBooking'))
    }


    renderItem = (data) => {
        if (data) {
            return data.map((item) => {
                return (
                    <div key={item._id}>
                        <img src={item.Image} alt={item.product_name} />
                        <h3>{item.product_name}</h3>
                        <h4><i class="fa-sharp fa-solid fa-dollar-sign"></i> {item.Price}</h4>
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
                    <center>
                        <h2>Login First To Place Booking</h2>
                    </center>

                </>
            )
        }
        return (
            <>
            <Header />
                <h1>Shopping Cart</h1>
                <form action="http://localhost:4100/paynow" method="POST">
                    <input type="hidden" name="cost" value={this.state.cost} />
                    <input type="hidden" name="id" value={this.state.id} />
                    <label htmlFor="fname" className='control-label'>FirstName</label>
                    <input className='form-control' id="fname" name="name" value={this.state.name} onChange={this.handleChange} />
                    <label htmlFor="email" className='control-label'>Email</label>
                    <input className='form-control' id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <label htmlFor="phone" className='control-label'>Phone</label>
                    <input className='form-control' id="phone" name="phone" value={this.state.phone} onChange={this.handleChange} />
                    <label htmlFor="address" className='control-label'>Address</label>
                    <input className='form-control' id="address" name="address" value={this.state.address} onChange={this.handleChange} />
                    {this.renderItem(this.state.Item)}
                    <h2>Total Price is Rs.{this.state.cost}</h2>
                    <button className='btn btn-success' onClick={this.checkout} type="submit">PlaceOrder</button>
                </form>
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