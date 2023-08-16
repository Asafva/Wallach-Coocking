import React, { useEffect, useState } from 'react'
import './Login.css'
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'


export const Login = () => {
    const [data, setData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();


    const userLoggedin = async () => {
        const isLoggedIn = localStorage.getItem('user')
        if (isLoggedIn) {
            console.log("test");
            alert("User logged in")
            navigate('/');
        }
        if (!isLoggedIn) {
            console.log("Please Login");
        }

    }


    const handleSubmit = async (e) => {
        console.log(data);
        console.log("login test");
        e.preventDefault();
        try {
            await axios('http://localhost:5001/users/login', {
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((data) => {
                    if (data) {
                        console.log(data.data);
                        localStorage.setItem("user", JSON.stringify(data.data))
                    }
                })
                .then(() => {
                    userLoggedin();
                    window.location.reload();
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                    }
                })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userLoggedin();
    }, []);


    return (
        <div className='loginContainer'>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className='loginForm' onSubmit={handleSubmit}>
                <h3>Login</h3>
                <label className='loginLable' type="email">Email</label>
                <input type="text" className='loginInput' name="email" required onChange={e => setData({ ...data, email: e.target.value })} placeholder="Email" />

                <label className='loginLable' type="email">Password</label>
                <input type="text" className='loginInput' name="password" required onChange={e => setData({ ...data, password: e.target.value })} placeholder="Password" />

                <button className='loginButton'>Log In</button>
                <NavLink to={"/register"} className='registerButton'>
                    Register
                </NavLink>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
            </form >
        </div >
    )
}
