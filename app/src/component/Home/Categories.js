import React, { Component } from 'react';
import axios from 'axios';
import CategoriesDisplay from './CategoriesDisplay';
const CategoriesUrl = "https://mtw.onrender.com/categories";
class Categories extends Component {
    constructor() {
        super()

        this.state = {
            Category: ''
        }
    }
    render() {
        return (
                <CategoriesDisplay CategoryData={this.state.Category} />
        )
    }

    componentDidMount() {
            axios.get(`${CategoriesUrl}`)
        .then((res) => {this.setState({Category:res.data})})
    }

}

export default Categories;