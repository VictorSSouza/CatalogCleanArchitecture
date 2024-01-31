import React, {useState} from "react";
import "../EntitiesStyles/signStyles.css";
import Validation from "./loginValidation.js";
import api from "../../services/api";
import {Link} from "react-router-dom";

import Cadastro from "../../assets/cadastro.png";

export default function SignUp(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    async function signUp(event){
        event.preventDefault();

        const data = {
            email, password, confirmPassword
        }

        try{
            const response = await api.post('api/Account/CreateUser', data);

            localStorage.setItem('email', response.data.email);
            localStorage.setItem('password', response.data.password);
            localStorage.setItem('confirmPassword', response.data.password);
        }catch(error){
            setErrors(Validation(data));
            alert('O cadastro falhou '+error);
        }

    }
    return(
        <div className="login-container">
            <section className="form">
                <img src={Cadastro} alt="chave" className="logoimg" />
                <form onSubmit={signUp}>
                    <h1>Cadastro</h1>
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
                    {errors.confirmPassword && <span className="text-valid">{errors.confirmPassword}</span>}
                    <input type="password" placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={e=>setConfirmPassword(e.target.value)}
                    />
                    <div className="button-container">
                        <button className="button" type="submit">Confirmar</button>
                        <Link className="button" to="/">Acessar</Link>
                    </div>
                </form>
            </section>
        </div>
    )
}