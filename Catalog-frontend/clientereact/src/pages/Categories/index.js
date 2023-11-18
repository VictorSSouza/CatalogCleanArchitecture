import React from "react";
import {Link} from "react-router-dom";
import "./styles.css";

import {FiXCircle, FiEdit, FiUserX, FiCornerDownRight} from "react-icons/fi";
import LogoInsert from "../../assets/formulario.png"

export default function Categories(){
    return(
        <div className="category-container">
            <h1>Lista de Categorias</h1>
            <header>
                <img src={LogoInsert} alt="Cadastro" />
                <span>Bem-vindo, <strong>Victor</strong>!</span>
                <Link className="button" to="/Products">
                    <FiCornerDownRight size={25} color="#17202a" />
                    Lista de Produtos
                </Link>
                <Link className="button" to="/Category/new/0">Nova Categoria</Link>
                <button type="button" >
                    <FiXCircle size={40} color="#17202a" />
                </button>
            </header>
            <form>
                <input type="text" placeholder="Nome" />
                <button type="button" className="button">
                    Filtrar Categoria por nome (parcial)
                </button>       
            </form>
            <h1>Relação de Categorias</h1>
            <ul>
                <li>
                    <b>Nome: </b>Bolo<br /><br />
                    <b>Url da Imagem: </b>bolo1.png<br /><br />
                    <button type="button">
                        <FiEdit size={25} color="#17202a" />
                    </button>
                    <button>
                        <FiUserX size={25} color="#17202a" />
                    </button>
                </li>
                <li>
                    <b>Nome: </b>Bolo<br /><br />
                    <b>Url da Imagem: </b>bolo1.png<br /><br />
                    <button type="button">
                        <FiEdit size={25} color="#17202a" />
                    </button>
                    <button>
                        <FiUserX size={25} color="#17202a" />
                    </button>
                </li>
            </ul>
        </div>
    )
}