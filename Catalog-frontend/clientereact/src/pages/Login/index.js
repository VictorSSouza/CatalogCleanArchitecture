import React from "react";
import "./styles.css";

import ImgLogin from "../../assets/login.png"

export default function Login(){
    return(
        <div className="login-container">
            <section className="form">
                <img src={ImgLogin} alt="login" id="img1" />
                <form>
                    <h1>Cadastro</h1>
                    <input  placeholder="Email"/>
                    <input type="password" placeholder="Password" />
                    <button className="button" type="submit">Login</button>
                </form>
            </section>
        </div>
    )
}