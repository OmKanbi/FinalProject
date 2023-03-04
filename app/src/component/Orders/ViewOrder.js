import React,{Component} from 'react';
import axios from 'axios';
import OrderDisplay from './OrderDisplay';
import Header from '../Header';

const orderApi = "https://mtw.onrender.com/viewOrder";

class ViewOrder extends Component {
    constructor(props) {
        super(props)

        this.state={
            orders:''
        }
    }

    render(){
        return(
            <>
            <Header />
                <OrderDisplay orderData={this.state.orders}/>
            </>
        )
    }

    componentDidMount(){
        // if(this.props.history){
        //     let query = this.props.location.search.split('&');
        //     if(query){
        //         let data = {
        //             "status":query[0].split('=')[1],
        //             "date":query[2].split('=')[1],
        //             "bank_name":query[3].split('=')[1]
        //         }
        //         sessionStorage.setItem('bank' , data.bank_name)
        //         sessionStorage.setItem('date' , data.date)
        //         sessionStorage.setItem('status' , data.status)
                
        //     }
        // }
        axios.get(orderApi).then((res) => {this.setState({orders:res.data})} )
    }

}

export default ViewOrder;