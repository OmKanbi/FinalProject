
import React, { Component } from 'react';
import axios from 'axios';

const url = " http://3.17.216.66:4000/filter";

class Filter extends Component {

    costFilter = (event) => {
        let mealId = this.props.mealId;
        let cost = event.target.value.split('-');
        let lcost = cost[0];
        let hcost = cost[1];
        let costUrl = "";
        if (event.target.value === "") {
            costUrl = `${url}/${mealId}`
        } else {
            costUrl = `${url}/${mealId}?hcost=${hcost}&lcost=${lcost}`
        }
        axios.get(costUrl)
            .then((res) => { this.props.restPerCost(res.data) })
    }

     filter = () => {
        document.getElementById('filter').classList.toggle('phone-filter');
    }
    render(){
        return(
            <>
            <div class="filter" id="filter">
                <form>
                    <div class="filter-title">
                        <h4 class="no-mb">FILTER</h4>
                        <input type="reset" class="clearall" value="CLEAR ALL" />
                    </div>
    
                    <hr />
                    <h5 class="filter-heading no-mb">Price</h5>
                    <div><input type="radio" id="suits" name="price" value="Suits" />
                        <label htmlFor="suits"> Suits </label>
                    </div>
                    <div><input type="radio" id="shirts" name="price" value="Shirts" />
                        <label htmlFor="shirts"> Shirts</label>
                    </div>
                    <div><input type="radio" id="tshirts" name="price" value="10-50" />
                        <label htmlFor="tshirts"> $10 - $50 </label>
                    </div>
                    <div><input type="radio" id="polo" name="price" value="PoloShirts" />
                        <label htmlFor="polo"> Polo Shirts</label>
                    </div>
                    <div><input type="radio" id="pants" name="price" value="Pants" />
                        <label htmlFor="pants"> T-Shirts </label>
                    </div>
                </form>
            </div>
            <div class="filter-btn" onClick={this.filter}><i class="fa-solid fa-filter"></i></div>
            </>
        )
    }
}
export default Filter;