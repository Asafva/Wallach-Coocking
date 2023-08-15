import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from '../About/About';
import Header from '../Layout/Header/Header'
import Mid from '../Layout/Mid/Mid';
import Footer from '../Layout/Footer/Footer'
import { AddRecipe } from '../AddRecipe/AddRecipe';
import RecipeInfo from '../RecipeInfo/RecipeInfo';
import { EditRecipe } from '../EditRecipe/EditRecipe';
import { Login } from '../UserAuth/LoginForm/Login';
import { Register } from '../UserAuth/RegisterForm/Register';



export default function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Mid />} />
                <Route index element={<Mid />} />
                <Route path="/about" element={<About />} />
                <Route path="/add" element={<AddRecipe />} />
                <Route path="/about" element={<About />} />
                <Route path="/:id" element={<RecipeInfo />} />
                <Route path="/update/:id" element={<EditRecipe />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="*" element={<notFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
