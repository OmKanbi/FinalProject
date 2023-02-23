import React from 'react';

const OrderDisplay = (props) => {

    const renderTable = ({orderData}) => {
        if(orderData){
            return orderData.map((item) => {
                return(
                    
                    <tr key={item._id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td><i class="fa-sharp fa-solid fa-dollar-sign"></i> {item.cost}</td>
                        <td>{sessionStorage.getItem('date')}</td>
                        <td>{sessionStorage.getItem('status')}</td>
                        <td>{sessionStorage.getItem('bank')}</td>
                    </tr>
                    
                )
            })
        }
    }

    return(
        <div className="orders-wrapper">
            <center><h3>Orders</h3></center>
            <table className="table">
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Cost</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>BankName</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable(props)}
                </tbody>
            </table>
        </div>
    )

}

export default OrderDisplay