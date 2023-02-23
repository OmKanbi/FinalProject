import React from 'react';
import { Link } from 'react-router-dom';

const ListingDisplay = (props) => {
    console.log(">>>", props)

    let renderData = ({ listData }) => {
        if (listData) {
            if (listData.length > 0) {
                return listData.map((item) => {
                    return (
                        <Link to={`/collection/${item.category}/${item.product_id}`} key={item._id}>
                            <div class="list-item">
                                <img src={item.Image} alt={item.category} />
                                <div class="list-item-desc">
                                    <h4>{item.product_name}</h4>
                                    <p>{item.description}</p>
                                    <strong><i class="fa-sharp fa-solid fa-dollar-sign"></i> {item.Price}</strong>
                                </div>
                            </div>
                        </Link>
                    )
                })
            } else {
                return (
                    <div>
                        <h2>No Data As Per Filter</h2>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <h2>Loading....</h2>
                </div>
            )
        }
    }

    return (
        <div class="list-wrapper">
            {renderData(props)}
        </div>
    )

}

export default ListingDisplay;