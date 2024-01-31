import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../EntitiesStyles/objectStyles.css";
import api from "../../services/api";
import { FiEdit, FiUserX } from "react-icons/fi";
import Nav from "../Nav";
import Logout from "../Logout";

export default function Products(){

    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filter, setFilter] = useState([]);

    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const searchProduct = (searchValue) =>{
        setSearchInput(searchValue);

        if(searchInput !== ''){
            const filteredData = products.filter((item) =>{
                return Object.values(item).join('').toLowerCase()
                .includes(searchInput.toLowerCase())
            });
            setFilter(filteredData);
        }else{
            setFilter(products);
        }
    }
    
    useEffect(() => {
        api.get('api/Product', authorization)
            .then(response => {
                setProducts(response.data);
            }, token)
    })

    async function editProduct(id){
        try{
            navigate(`/Product/new/${id}`);
        }catch(error){
            alert("Não é possível editar o produto");
        }
    }

    async function deleteProduct(id){
        try{
            if(window.confirm('Deseja deletar o produto de id = ' + id + '?')){
                await api.delete(`api/Product/${id}`, authorization);
                setProducts(products.filter(product => product.id !== id));
            }
        }catch(error){
            alert("Não foi possível excluir o produto");
        }
    }

    return(
        <div className="object-container">
            <h1>Lista de Produtos</h1>
            <header>
                <Nav />
                <Link className="button" to="/Product/new/0"> Novo Produto</Link>
                <Logout />
            </header>
            <form>
                <input type="text" placeholder="Filtrar produto por nome"
                   onChange={(e) => searchProduct(e.target.value)} />
            </form>
            <h1>Relação de Produtos</h1>
            {searchInput.length > 1 ? (
                <ul>
                {filter.map(product=>(
                    <li key={product.id}>
                        <b>Nome: </b>{product.name} <br />
                        <b>Descrição: </b>{product.description} <br />
                        <b>Preço: </b>{product.price} <br />
                        <b>Url da imagem: </b>{product.imageUrl} <br />
                        <b>Estoque: </b>{product.stock} <br />
                        <b>Data de Registro: </b>{product.registerDate} <br />
                        <b>Id da Categoria: </b>{product.categoryId} <br />

                        <button type="button" title="Editar" onClick={() => editProduct(product.id)}>
                            <FiEdit size={25} color="#17202a" />
                        </button>
                        <button type="button" title="Excluir" onClick={() => deleteProduct(product.id)}>
                            <FiUserX size={25} color="#17202a" />
                        </button>
                    </li>
                ))}   
                </ul>
            ) : (
                <ul>
                {products.map(product=>(
                   <li key={product.id}>
                       <b>Nome: </b>{product.name} <br />
                       <b>Descrição: </b>{product.description} <br />
                       <b>Preço: </b>{product.price} <br />
                       <b>Url da imagem: </b>{product.imageUrl} <br />
                       <b>Estoque: </b>{product.stock} <br />
                       <b>Data de Registro: </b>{product.registerDate} <br />
                       <b>Id da Categoria: </b>{product.categoryId} <br />
   
                       <button type="button" title="Editar" onClick={() => editProduct(product.id)}>
                           <FiEdit size={25} color="#17202a" />
                       </button>
                       <button type="button" title="Excluir" onClick={() => deleteProduct(product.id)}>
                           <FiUserX size={25} color="#17202a" />
                       </button>
                   </li>
                ))}   
               </ul>
            )}
        </div>
    )
}