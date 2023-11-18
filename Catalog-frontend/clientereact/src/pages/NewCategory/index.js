import React from "react";
import { Link, useParams} from "react-router-dom";
import "./styles.css";
import { FiUserPlus, FiCornerDownLeft } from "react-icons/fi";

export default function NewCategory(){

    const {categoryId} = useParams(); 

    return(
        <div className="new-category-container">
            <div className="content">
                <section className="form">
                    <FiUserPlus size="105" color="#17202a" />
                    <h1>{categoryId === '0'? 'Incluir Nova Categoria' : 'Atualizar Categoria'}</h1>
                    <Link className="back-link" to="/Categories">
                        <FiCornerDownLeft size="25" color="#17202a" />
                        Retornar
                    </Link>
                </section>
                <form>
                    <input placeholder="Nome" />
                    <input placeholder="Url da Imagem" />
                    <button className="button" type="submit">{categoryId === '0'? 'Incluir' : 'Atualizar'}</button>
                </form>
            </div>
        </div>
    )
}