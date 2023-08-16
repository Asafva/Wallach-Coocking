import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Form from 'react-bootstrap/Form';
import './EditRecipe.css'
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { userLoggedin } from '../Global';





export const EditRecipe = () => {
    const [post, setPost] = useState({
        name: '',
        description: '',
        image: '',
        recipe: ''
    });
    const { id } = useParams()
    const data = post;
    const navigate = useNavigate();

    useEffect(() => {
        userLoggedin()
    }, [])


    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5001/products/${id}`)
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
        event.preventDefault();
        const options = {
            method: 'PUT',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: `http://localhost:5001/products/${id}`,
        };
        console.log(options)
        axios(options);
        navigate('/');

    }

    return (
        <div className='formSubmit'>
            <h3>   "ערוך את "{post.name}</h3>
            <hr />
            <Form onSubmit={handleSubmit}>
                {/* שם המתכון */}
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        className='input-edit'
                        onChange={handleInput}
                        name="name"
                        required
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={post.name}
                    />
                    <InputGroup.Text id="inputGroup-sizing-default">
                        :שם המתכון
                    </InputGroup.Text>
                </InputGroup>

                {/* תיאור */}
                <InputGroup className="mb-3">
                    <Form.Control
                        as="textarea"
                        className='input-edit'
                        aria-label="With textarea"
                        onChange={handleInput}
                        name="description"
                        required
                        value={post.description} />
                    <InputGroup.Text id="inputGroup-sizing-default">
                        : תיאור המתכון
                    </InputGroup.Text>
                </InputGroup>
                <Form.Group>

                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            className='input-edit'
                            aria-label="With textarea"
                            onChange={handleInput}
                            name="recipe"
                            required
                            value={post.recipe}
                        />
                        <InputGroup.Text> :מתכון מלא</InputGroup.Text>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="position-relative mb-3">
                    <br />
                    <Form.Control
                        type="file"
                        className='input-edit'
                        // required
                        onChange={handleInput}
                        name="image"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label> :תמונה</Form.Label>
                    <Form.Control
                        type="text"
                        className='input-edit'
                        onChange={handleInput}
                        name="image"
                        value={post.image}
                    />
                </Form.Group>

                <br />

                {/* green button */}
                <Button variant="primary" type="submit">
                    שמור מתכון
                </Button>
            </Form>
        </div>
    )
}
