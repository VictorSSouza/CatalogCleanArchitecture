import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../EntitiesStyles/objectStyles.css";
import api from "../../services/api";
import { FiEdit, FiUserX } from "react-icons/fi";
import Nav from "../Nav";
import Logout from "../Logout";

export default function Categories() {

    
    const [categories, setCategories] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filter, setFilter] = useState([]);

    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const searchCategory = (searchValue) =>{
        setSearchInput(searchValue);

        if(searchInput !== ''){
            const filteredData = categories.filter((item) =>{
                return Object.values(item).join('').toLowerCase()
                .includes(searchInput.toLowerCase())
            });
            setFilter(filteredData);
        }else{
            setFilter(categories);
        }
    }

    useEffect(() => {
        api.get('api/Category', authorization)
            .then(response => {
                setCategories(response.data);
            }, token)
    })

    async function editCategory(id) {
        try {
            navigate(`/Category/new/${id}`);
        } catch (error) {
            alert("Não é possível editar categoria");
        }
    }

    async function deleteCategory(id){
        try {
            if(window.confirm('Deseja deletar a categoria de id = '+ id + '?')){
                await api.delete(`api/Category/${id}`, authorization);
                setCategories(categories.filter(category => category.id !== id));
            }
        }catch(error) {
            alert("Não foi possível excluir a categoria");
        }
    }

    return (
        <div className="object-container">
            <h1>Lista de Categorias</h1>
            <header>
                <Nav/>
                <Link className="button" to="/Category/new/0">Nova Categoria</Link>
                <Logout />
            </header>
            <form>
                <input type="text" placeholder="Filtrar Categoria por nome"
                  onChange={(e) => searchCategory(e.target.value)} />
            </form>
            <h1>Relação de Categorias</h1>
            {searchInput.length > 1 ? (
                <ul>
                {filter.map(category => (
                    <li key={category.id}>
                        <b>Nome:</b>{category.name}<br />
                        <b>Url da imagem:</b>{category.imageUrl}<br />
                        <button onClick={() => editCategory(category.id)} type="button">
                            <FiEdit size={25} color="#17202a" />
                        </button>
                        <button onClick={() => deleteCategory(category.id)} type="button">
                            <FiUserX size={25} color="#17202a" />
                        </button>
                    </li>
                ))}
                </ul>
            ) : (
                <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <b>Nome:</b>{category.name}<br />
                        <b>Url da imagem:</b>{category.imageUrl}<br />
                        <button onClick={() => editCategory(category.id)} type="button">
                            <FiEdit size={25} color="#17202a" />
                        </button>
                        <button onClick={() => deleteCategory(category.id)} type="button">
                            <FiUserX size={25} color="#17202a" />
                        </button>
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}