import React from 'react';
const Coupon = () => {
    window.onload = function loadcoupon() {
        document.getElementById('coupon-content').style.visibility = "visible";
    }

    function closecoupon() {
        document.getElementById('coupon-content').style.visibility = "hidden";
    }
    return (
        <div id="coupon-content">
            <div id="coupon">
                <button type="button" class="btn-close" onClick={closecoupon} aria-label="Close">X</button>
                <img src="https://i.ibb.co/7KV1cT8/sale.jpg" alt="sale" />
            </div>
        </div>
    )
}
export default Coupon;