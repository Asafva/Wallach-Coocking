import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Form from 'react-bootstrap/Form';
import './EditRecipe.css'



export const EditRecipe = () => {
    const [post, setPost] = useState({
        name: '',
        description: '',
        image: '',
        recipe: ''
    });
    const { id } = useParams()
    const data = post;


    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/products/${id}`)
                .then(res => {
                    // console.log(res.data)
                    setPost(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

        }
    }, [id]);


    const handleInput = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
        // console.log(event.target.value)
    }

    function handleSubmit(event) {

        const options = {
            method: 'PUT',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: `http://localhost:3000/products/${id}`,
        };
        console.log(options)
        axios(options);

    }

    return (
        <div className='formEdit'>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label> :שם המתכון</Form.Label>
                    <Form.Control type="text" onChange={handleInput} name="name" value={post.name}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label> :תיאור</Form.Label>
                    <Form.Control type="text" onChange={handleInput} name="description" value={post.description}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label> :תמונה</Form.Label>
                    <Form.Control type="text" onChange={handleInput} name="image" value={post.image}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>  :מתכון מלא</Form.Label>
                    <Form.Control type="textarea" onChange={handleInput} name="recipe" required value={post.recipe} />

                </Form.Group>

                <br />
                <NavLink to={"/"}>
                    <button >חזרה לתפריט</button>
                </NavLink>
            </Form>
        </div>
    )
}
