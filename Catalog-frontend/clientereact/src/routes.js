import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Categories from "./pages/Categories";
import NewCategory from "./pages/NewCategory";

export default function RoutesApp(){
    return(
        <BrowserRouter>
         <Routes>
            <Route path="/" exact Component={Login} />
            <Route path="/Categories" Component={Categories} />
            <Route path="/Category/new/:categoryId" Component={NewCategory} />
         </Routes>        
        </BrowserRouter>
    );
}