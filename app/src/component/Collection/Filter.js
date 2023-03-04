
import React, { Component } from 'react';
import axios from 'axios';

const url = " https://mtw.onrender.com/products";

class Filter extends Component {

    costFilter = (event) => {
        let productCategory = this.props.productCategory;
        let cost = event.target.value.split('-');
        let lcost = cost[0];
        let hcost = cost[1];
        let costUrl = "";
        if (event.target.value === "") {
            costUrl = `${url}/${productCategory}`
        } else if (event.target.value === "CLEAR") {
            costUrl = `${url}/${productCategory}`
        } else {
            costUrl = `${url}/${productCategory}?hcost=${hcost}&lcost=${lcost}`
            console.log(costUrl)
        }
        axios.get(costUrl)
            .then((res) => { this.props.productPerCost(res.data) })
    }

    filter = () => {
        document.getElementById('filter').classList.toggle('phone-filter');
    }
    clearall =()=> {
         axios.get(`${url}/${this.props.productCategory}`)
            .then((res) => { this.props.productPerCost(res.data) })
        }
    render(){
        return(
            <>
            <div class="filter" id="filter">
                <form onChange={this.costFilter}>
                    <div class="filter-title">
                        <h4 class="no-mb">FILTER</h4>
                        <input type="reset" onClick={this.clearall} class="clearall" value="CLEAR ALL" />
                    </div>
                    <div>
                    <hr />
                    <h5 class="filter-heading no-mb">Price</h5>
                    <div><input type="radio" id="one" name="price" value="10-40" />
                        <label htmlFor="one"> $10 - $40 </label>
                    </div>
                    <div><input type="radio" id="two" name="price" value="40-60" />
                        <label htmlFor="two"> $40 - $60 </label>
                    </div>
                    <div><input type="radio" id="three" name="price" value="60-90" />
                        <label htmlFor="three"> $60 - $90 </label>
                    </div>
                    <div><input type="radio" id="four" name="price" value="90-120" />
                        <label htmlFor="four"> $90 - $120 </label>
                    </div>
                    <div><input type="radio" id="five" name="price" value="200-300" />
                        <label htmlFor="five"> $200 - $300 </label>
                    </div>
                    <div><input type="radio" id="six" name="price" value="300-600" />
                        <label htmlFor="six"> $300 - $600</label>
                    </div>
                    </div>
                </form>
            </div>
            <div class="filter-btn" onClick={this.filter}><i class="fa-solid fa-filter"></i></div>
            </>
        )
    }
}
export default Filter;