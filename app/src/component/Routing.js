import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Footer from './Footer';
import Home from './Home/Home';
import Coupon from './Coupon';
import Listing from './Collection/Listing'
import Product from './Product/Product' 
import Login from './Login/Login'
import Register from './Login/Register'
import PlaceOrder from './Orders/PlaceOrder';
import ViewOrder from './Orders/ViewOrder'
import './Style.css';

const Routing = () => {
    return(
        <BrowserRouter>
        <Coupon />
                <Route exact path="/" component={Home} />
                <Route exact path="/collection/:productCategory" component={Listing} />
                <Route path="/collection/:productCategory/:productId" component={Product} />
                <Route path="/placeOrder" component={PlaceOrder}/>
                <Route path="/viewBooking" component={ViewOrder}/>
                <Route path="/login" component={Login} />
                <Route path="/Register" component={Register} />
            <Footer />
        </BrowserRouter>
    )
}


export default Routing;