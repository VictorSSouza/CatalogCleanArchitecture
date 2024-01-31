import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/login.js";
import SignUp from "./pages/Login/signup.js";
import Categories from "./pages/Categories";
import NewCategory from "./pages/NewCategory";
import Products from "./pages/Products";
import NewProduct from "./pages/NewProduct";

export default function RoutesApp(){
    return(
        <BrowserRouter>
         <Routes>
            <Route path="/" exact Component={Login} />
            <Route path="/Signup" Component={SignUp}/>
            <Route path="/Categories" Component={Categories} />
            <Route path="/Category/new/:categoryId" Component={NewCategory} />
            <Route path="/Products" Component={Products} />
            <Route path="/Product/new/:productId" Component={NewProduct} />
         </Routes>        
        </BrowserRouter>
    );
}