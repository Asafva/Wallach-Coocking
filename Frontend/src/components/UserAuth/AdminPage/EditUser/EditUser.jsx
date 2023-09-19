import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import './EditUser.css'
import { userLoggedin } from '../../../Global';


export const EditUser = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        isAdmin: ''
    });
    const [currentUser, setCurrentUser] = useState([])

    const { id } = useParams()
    const data = user;
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const options = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        }
        return new Date(dateString).toLocaleDateString("en-GB", options)
    }

    useEffect(() => {
        userLoggedin()
    }, [])



    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5001/users/${id}`)
                .then(res => {
                    console.log(res.data)
                    setUser(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [id]);


    const handleInput = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
        console.log(event.target.value)
    }

    function handleSubmit(event) {
        const options = {
            method: 'PUT',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: `http://localhost:5001/users/${id}`,
        };
        console.log(options)
        axios(options);
        alert(`User Updated`)


    }

    const deleteUser = (id) => {
        if (id === currentUser.id) {
            if (window.confirm(`Are you sure you want to delete ${id}`)) {
                alert("Cant delete you're own user")
            } else {
                alert("ok")
            }
            console.log(`Same ID ButtonID:${id} OnlineID:${currentUser.id}`);
        }
        else {
            if (window.confirm(`Are you sure you want to delete ${id}`)) {
                axios.delete(`http://localhost:5001/users/${id}`)
                    .then(res => {
                        alert(`Deleted user ${id}`)
                        window.location.reload(true);
                    })
            } else {
                alert("ok")
            }
            console.log(`DiffrentID ButtonID:${id} OnlineID:${currentUser.id}`);
        }
        navigate('/admin');
    }

    return (
        <main>

            <a href="/admin"><button type="submit" className='BackButton'>{"<"}</button></a>
            <form className='userForm' onSubmit={handleSubmit} method='put'>
                <div>
                    <label htmlFor="id">User ID:</label>
                    <label className='inputUser' type="text"  >{user._id}</label>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        onChange={handleInput}
                        name="username"
                        required
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        defaultValue={user.username}
                        className='inputUser'
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input className='inputUser' type="email" defaultValue={user.email} onChange={handleInput} name='email' />
                </div>

                <div>

                    <fieldset>
                        Is Admin?
                        <select className='isAdmin' name="isAdmin" onChange={handleInput} >
                            <option disabled selected>------</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>

                        {/* <input type="radio" name="isAdmin" id="yes" value={true} onChange={handleInput} />
                        <label >True</label>
                        <br />
                        <input type="radio" name="isAdmin" id="no" value={false} onChange={handleInput} />
                        <label >False</label> */}
                    </fieldset>
                </div>
                <div>
                    <label htmlFor="id">Created On</label>
                    <label className='inputUser' id="name" type="text" >{formatDate(user.createdAt)}</label>
                </div>
                <div>
                    <label htmlFor="id">Last Updated</label>
                    <label className='inputUser' id="name" type="text" >{formatDate(user.updatedAt)}</label>
                </div>
                <div className="full-width">

                    <button type="submit" className='SubmitButton'>Update User</button>
                    <button type="submit" className='DeleteButton' onClick={(e) => deleteUser(user._id, e)}>Delete User</button>

                </div>
            </form>
        </main>

    )
}
