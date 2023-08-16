import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeInfo.css'
import { userLoggedin } from '../Global';


const RecipeInfo = () => {
    const [post, setPost] = useState({})
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5001/products/${id}`)
                .then(res => {
                    console.log(res.data)
                    setPost(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

        }
        userLoggedin()
    }, [id]);




    return (
        <div className='MainInfo'>
            <h2>{post.name}</h2>
            <img className='recipieImg' src={post.image} alt="" />
            <p>{post.description}</p>
            מתכון מלא:
            <p>{post.recipe}</p>
            <br />
            <NavLink to={"/"}>
                <button >חזרה לתפריט</button>
            </NavLink>
        </div>
    );
}
export default RecipeInfo;









