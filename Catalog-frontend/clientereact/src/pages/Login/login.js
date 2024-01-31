import React, {useState} from "react";
import "../EntitiesStyles/signStyles.css";
import Validation from "./loginValidation.js";
import api from "../../services/api";
import {Link, useNavigate} from "react-router-dom";

import ImgLogin from "../../assets/login.png";

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    async function login(event){
        event.preventDefault();

        const data = {
            email, password
        }

        try{

            const response = await api.post('api/Account/LoginUser', data);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            navigate('/Categories');

        }catch(error){
            setErrors(Validation(data));
            alert('O login falhou ' + error);
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={ImgLogin} alt="Cadeado" className="logoimg" />
                <form onSubmit={login}>
                    <h1>Login</h1>
                    {errors.email && <span className="text-valid">{errors.email}</span>}
                    <input type="text" name="email" placeholder="Email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    {errors.password && <span className="text-valid">{errors.password}</span>}
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <div className="button-container">
                        <button className="button" type="submit">Acessar</button>
                        <Link className="button" to="/Signup">Cadastre-se</Link>
                    </div>
                </form>
            </section>
        </div>
    )
}