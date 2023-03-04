import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
const url = "https://mtw2.onrender.com/api/auth/userInfo"
class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userData: '',
            temp: sessionStorage.getItem('temp'),
            city: sessionStorage.getItem('city')
        }
    }

    handleLogout = () => {
        sessionStorage.removeItem('ltk');
        this.setState({ userData: '' })
        this.props.history.push('/')
    }
    darkmode = () => {
        document.body.classList.toggle('darkmode');
        document.getElementById('logo').classList.toggle("dark-logo");
        document.getElementsByClassName('darkmode-icon')[0].classList.toggle('fa-moon');
        document.getElementsByClassName('darkmode-icon')[0].classList.toggle('fa-sun');
    }
    onClickMenu = () => {
        document.getElementById("menu").classList.toggle("icon");
        document.getElementById("sidenav").classList.toggle("sidenav");
    }

    conditionlHeader = () => {
        if (this.state.userData.name) {
            let data = this.state.userData;
            sessionStorage.setItem('userInfo', JSON.stringify(data))
            return (
                <>
                    <div class="nav-button">
                        <button onClick={this.darkmode}><i class="fa-solid fa-moon darkmode-icon"></i></button>
                        <Link to={"/placeorder"}><button><i class="fa-solid fa-cart-shopping nav-icon"></i></button></Link>
                        <button class="loggedin"><i class="fa-solid fa-user"></i> &nbsp;Hi {data.name}</button>
                        <button onClick={this.handleLogout}>Logout</button>
                    </div>
                </>
            )
        } else {
            return (
                <div class="nav-button">
                    <button onClick={this.darkmode}><i class="fa-solid fa-moon darkmode-icon"></i></button>
                    <Link to={"/placeorder"}><button><i class="fa-solid fa-cart-shopping nav-icon"></i></button></Link>
                    <Link to={`/login`}><button>Login</button></Link>
                    <Link to={`/register`}><button>Register</button></Link>
                </div>
            )
        }
    }

    render() {
        return (
            <>
                <header>
                    <nav class="navbar">
                        <img id="logo" src="https://i.ibb.co/NZBBX7k/logo.png" alt="logo" width="90" />
                        <div id="sidenav" class="navigation">
                            <form action=""><input type="search" name="" id="" /><button type="submit"><i
                                class="fa-solid fa-magnifying-glass"></i></button></form>
                            <ul class="navlist">

                                <li><Link to="/">Home</Link></li>

                                <li id="location">
                                    <span id="out">{this.state.city} {this.state.temp}</span>
                                    <span id="weather"></span>
                                </li>
                            </ul>
                            {this.conditionlHeader()}
                        </div>
                        <div id="menu" onClick={this.onClickMenu}>
                            <div id="bar1" class="bar"></div>
                            <div id="bar2" class="bar"></div>
                            <div id="bar3" class="bar"></div>
                        </div>
                    </nav>


                </header>
            </>
        )
    }

    componentDidMount() {
        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': sessionStorage.getItem('ltk')
            }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    userData: data  
                })
            })
        navigator.geolocation.getCurrentPosition(
            function (data) {
                let lat = data.coords.latitude;
                let long = data.coords.longitude;
                console.log(data);
                const wurl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
                fetch(wurl, { method: 'GET' })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        let city = data.city.name
                        let temp = data.list[0].temp.day
                        console.log(city + temp)
                       sessionStorage.setItem('city' , city)
                       sessionStorage.setItem('temp' , temp + "°C")
                    })

            },
        );
    }
}
export default withRouter(Header);

