import React from 'react';

import './Login.css';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            password: '',
            email: ''
        };

    }

    // static contextType = LoginContext;

    

    onChangePassword = (password) => {
        this.setState({
            password
        });
    }

    onChangeEmail = (email) => {
        this.setState({
            email
        });
    }

  

    btnGoogle = (e) => {
        e.preventDefault();

        fetch('https://afternoon-mesa-97298.herokuapp.com/auth/login/google',
        {   method: "GET", 
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://opv.elijahguerrero97.vercel.app/',
                'Content-Type': 'applications/json',
                'redirect': 'follow'
            }
        })
        .then(res => {
            console.log('returned from fetch');
            if(!res.ok){
                console.log('not ok');
            }
            return res.json(); //the response is NOT Json
        })
        .then(res => {
            console.log('about to open');
            let myWindow = window.location.href="https://afternoon-mesa-97298.herokuapp.com/auth/google";     
        })
        .catch(err => {
            console.log('ERROR: ', err);
        })
     }

    render() {
        return(
        <div className='login-page'>
            <div onClick={(e) => this.btnGoogle(e)}> 
                <h1>Login</h1>


                <section className={this.state.errorClass}>
                        <p>{this.state.errorMessage}</p>
                </section>
            </div>
        </div>
        );
    }

}

export default Login;