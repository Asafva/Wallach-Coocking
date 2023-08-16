import React, { useState } from 'react'
import './Register.css'
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export const Register = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        console.log(data);
        try {
            e.preventDefault();
            const response = await fetch('http://localhost:5001/users/register', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log(result);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='registerContainer'>
            <div className="background">
            </div>
            <form className='registerForm' onSubmit={handleSubmit}>
                <h3>Register</h3>
                <label className='registerLable'>Username</label>
                <input type="text" name="username" required onChange={e => setData({ ...data, username: e.target.value })} className='registerInput' placeholder="Username" />

                <label className='registerLable'>Email</label>
                <input type="text" name="email" required onChange={e => setData({ ...data, email: e.target.value })} className='registerInput' placeholder="Email" />

                <label className='registerLable'>Password</label>
                <input type="text" name="password" required onChange={e => setData({ ...data, password: e.target.value })} className='registerInput' placeholder="Password" />

                <button className='registerButton'>Register</button>
                <NavLink to={"/login"} className='registerButton'>
                    Log In
                </NavLink>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
            </form >
        </div >
    )
}
