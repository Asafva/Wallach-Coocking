import React, { Fragment } from 'react'
import './Card.css'
import axios from 'axios';
import { NavLink } from "react-router-dom";


class Card extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get(`http://localhost:5001/products`)
            .then(res => {
                const posts = res.data;
                this.setState({ posts });
            })


    }

    deleteRecipe(id) {
        if (window.confirm(`Do you really want to delete`)) {
            axios.delete(`http://localhost:5001/products/${id}`)
                .then(res => {
                    // console.log(res);
                    // console.log(res.data);
                    const posts = this.state.posts.filter(item => item.id !== id);
                    this.setState({ posts });
                    window.location.reload(true);
                })
        } else {
            alert("OK")
        }
    }



    render() {
        return (
            <div className='cardContainer'>
                <div className='searchForm'>
                    <input type="search" className='searchBar' name="search" placeholder="Search...🔎" />
                </div>
                {this.state.posts.map((post) => (
                    <Fragment key={post._id}>


                        <div className="card" key={post._id}>

                            <div className='buttons'>

                                <NavLink to={"/update/" + post._id}>
                                    <button className="btn btn-secondary" >✏️</button>
                                </NavLink>
                                <button className="btn btn-danger" onClick={(e) => this.deleteRecipe(post._id, e)}>❌</button>
                            </div>
                            <br />
                            <img className='recipieImg' src={post.image} alt="" />
                            <div className="card-details">
                                <h4 className="text-title">{post.name}</h4>
                                <p className="text-description">{post.description}</p>
                                <NavLink to={"/" + post._id}>
                                    <button className="card-button" >More info</button>
                                    <br />
                                </NavLink>
                            </div>
                        </div>
                    </Fragment>
                ))
                }
            </div >
        )
    }
}

export default Card;

