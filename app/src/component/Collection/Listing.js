import React,{Component} from 'react';
import Header from '../Header';
import axios from 'axios';
import ListingDisplay from './ListingDisplay';
import Filter from './Filter'
const curl = "https://mtw.onrender.com/products/"
class Listing extends Component {
    constructor() {
        super()

        this.state = {
            productCategory: ''
        }
    }
    setDataPerFilter = (data) => {
        this.setState({productCategory:data})
    }
    render() {
        return (
           <>
            <Header />
            <div class="listing-section-wrapper">
            <Filter productCategory={this.props.match.params.productCategory} productPerCost={(data) => {this.setDataPerFilter(data)}}/>
                <ListingDisplay listData={this.state.productCategory} />
                </div>
           </>
        )
    }
    componentDidMount(){
        let a = this.props.match.params.productCategory;
        sessionStorage.setItem('productCategory', a);
        axios.get(`${curl}${a}`)
        .then((res) => {this.setState({productCategory:res.data})})
    }
}
export default Listing;