import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './AddRecipe.css'
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';


export const AddRecipe = () => {
    const [post, setPost] = useState({
        name: '',
        description: '',
        image: '',
        recipe: ''
    });
    const navigate = useNavigate();


    const handleInput = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
        console.log(event.target.value)

    }

    function handleSubmit(event) {
        axios({
            method: "post",
            url: "http://localhost:5001/products",
            data: JSON.stringify(post),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                setPost(response.data)
                alert("DONE")
                navigate('/');
            })
            .catch(err => {
                console.log(err.response.data);
            });
        event.preventDefault()
    }

    return (
        <div className='formSubmit'>
            <h3>הוסף מתכון חדש</h3>
            <hr />
            <Form onSubmit={handleSubmit}>
                {/* שם המתכון */}
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text" onChange={handleInput} name="name"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        required
                    />
                    <InputGroup.Text id="inputGroup-sizing-default">
                        :שם המתכון
                    </InputGroup.Text>
                </InputGroup>

                {/* תיאור */}
                <InputGroup className="mb-3">
                    <Form.Control as="textarea" aria-label="With textarea" onChange={handleInput} name="description" required />
                    <InputGroup.Text id="inputGroup-sizing-default">
                        : תיאור המתכון
                    </InputGroup.Text>
                </InputGroup>
                <Form.Group>

                    <InputGroup>
                        <Form.Control as="textarea" aria-label="With textarea" onChange={handleInput} name="recipe" required />
                        <InputGroup.Text> :מתכון מלא</InputGroup.Text>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="position-relative mb-3">
                    <br />
                    <Form.Control

                        type="file"
                        // required
                        onChange={handleInput}
                        name="image"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label> :תמונה</Form.Label>
                    <Form.Control type="text" onChange={handleInput} name="image"
                    />
                </Form.Group>

                <br />

                {/* green button */}

                <Button variant="primary" type="submit">
                    הוסף מתכון
                </Button>

            </Form>
        </div>

    )
}

