import React,{Component} from 'react';
import Header from '../Header';
const regurl = "https://localhost:5000/api/auth/register"

class Register extends Component {
    constructor(props) {
        super(props)

        this.state={
            name:'om',
            waist : 32,
            inseam : 31,
            chest : 40, 
            email:'om@gmail.com',
            password:'12345678',
            phone:41243424214,
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    checkout=()=>{
        fetch(regurl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)})
            this.props.history.push('/')
    }

    render(){
        return(
            <>
            <Header />
                <div class="lr-wrapper">
                    <div class="lr-heading">
                        <h1>Register</h1>
                    </div>
                    <div class="lr-content">
                        <input type="text" placeholder="Name" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
                        <input type="text" placeholder="Phone No." name="phone" id="phone" value={this.state.phone} onChange={this.handleChange} />
                        <input type="text" placeholder="Waist (inches)" name="waist" id="waist" value={this.state.waist} onChange={this.handleChange} />
                        <input type="text" placeholder="Inseam (inches)" name="inseam" id="inseam" value={this.state.inseam} onChange={this.handleChange} />
                        <input type="text" placeholder="Chest width (inches)" name="chest" id="chest" value={this.state.chest} onChange={this.handleChange} />
                        <input type="text" placeholder="Email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
                        <input type="password" placeholder="Password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                        <button onClick={this.checkout}>Register</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Register