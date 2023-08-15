import React from 'react'
import './Login.css'

export const Login = () => {
    return (
        <div className='loginContainer'>
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form className='loginForm'>
                <h3>Login Here</h3>
                <label className='loginLable' type="username">Email</label>
                <input className='loginInput' type="text" placeholder="Email" />

                <label className='loginLable' type="password">Password</label>
                <input className='loginInput' type="current-password" placeholder="Password" />

                <button className='loginButton'>Log In</button>
                <button className='loginButton'>Register</button>

                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
            </form >
        </div >
    )
}
