import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesDisplay = (props) => {

    const CategoryList = ({ CategoryData }) => {
        if (CategoryData) {
            return CategoryData.map((item) => {
                return (
                    

                        <Link to={`/collection/${item.category}`} key={item.category}>
                            <div className="categories">
                                <img src={item.Image} class="categories-img" alt={item.category} />
                                <div className="categories-title">
                                    <h6 className="no-mb">Custom-tailored</h6>
                                    <h4>{item.category}</h4>
                                </div>
                            </div>
                        </Link>
                )
            })
        }
    }


    return (
        <div className="categories-wrapper">
            {CategoryList(props)}
        </div>
    )
}

export default CategoriesDisplay;