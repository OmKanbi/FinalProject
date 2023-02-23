import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <>
            <div class="footer-wrapper">
                <div class="footer-content1">
                    <h5>Useful Links</h5>
                    <ul>
                            <li><Link to="/">Shipping Policy</Link></li>
                        
                            <li><Link to="/">Privacy Policy</Link></li>
                        
                            <li><Link to="/">Return & Refund Policy</Link></li>
                        
                            <li><Link to="/">Terms & Services</Link></li>
                    </ul>
                </div>
                <div class="footer-content2">
                    <h5>Contact Us</h5>
                    <p>We are here to help you, Reach us out on call or email.<br />
                        +91 XXXXXXXXXX (MON-SAT 11AM TO 7PM)</p>
                </div>
                <div class="footer-content3">
                    <h5>FOLLOW US</h5>
                    <div id="social">
                        <Link to="/"><i class="fa-brands fa-square-facebook social"></i></Link>
                        <Link to="/"><i class="fa-brands fa-instagram social"></i></Link>
                    </div>
                </div>
            </div>
            <p class="copyright no-mb">Tailor Bird &copy; <span>2023 BY</span> Om Kanbi</p>
        </>
    )
}
export default Header;