import React, { Component } from 'react';
import Header from '../Header';
const logurl = "https://mtw2.onrender.com/api/auth/login"

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            message: ''
        }
    }

  handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit=()=>{
        fetch(logurl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.auth === false){
                this.setState({message:data.token})
            }else{
                sessionStorage.setItem('ltk',data.token)
                this.props.history.push('/')
            }
        })
    }

    render() {
        return (
            <>
            <Header />
                <div class="lr-wrapper">
                    <div class="lr-heading">
                        <h1>Login</h1>
                    </div>
                    <div class="lr-content">
                        <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
                        <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <button onClick={this.handleSubmit}>Login</button>
                        <p class="error">{this.state.message}</p>
                    </div>
                </div>
            </>
        )
    }
}

export default Login