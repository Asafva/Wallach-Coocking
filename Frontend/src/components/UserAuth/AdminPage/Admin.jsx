import React, { Fragment, useEffect, useState } from 'react'
import './Admin.css'
import { userLoggedin } from '../../Global'
import axios from 'axios'
import { NavLink } from "react-router-dom";



const Admin = () => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const token = localStorage.getItem("user").replace(/['"]+/g, '')
    // const token = localStorage.getItem("user")

    const allUsers = () => {
        axios.get(`http://localhost:5001/users`)
            .then(res => {
                JSON.stringify(res.data)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const showCurrentUser = () => {
        axios.get('http://localhost:5001/users/current', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((result) => {
                // console.log(result.data);
                // console.log(currentUser.id);
                setCurrentUser(result.data)
            })
            .catch((error) => {
                console.error(error)
            })
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
    }


    useEffect(() => {
        userLoggedin()
        allUsers()
        showCurrentUser()
    }, [])

    return (
        <div>

            <h1 className='adminHeader' >All Users</h1>
            {currentUser.isAdmin === true &&
                <table className='users'>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>IsAdmin</th>
                            <th>Actions</th>
                        </tr>
                        {users.map((user) => {
                            return (
                                <Fragment key={user._id}>
                                    {
                                        <tr >
                                            <td>{user._id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{JSON.stringify(user.isAdmin)}</td>
                                            <td>
                                                <NavLink to={"/update-user/" + user._id}>
                                                    <button className="btn btn-secondary" >✏️</button>
                                                </NavLink>
                                                <button onClick={(e) => deleteUser(user._id, e)}>❌</button>
                                            </td>
                                        </tr>
                                    }
                                </Fragment>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Admin