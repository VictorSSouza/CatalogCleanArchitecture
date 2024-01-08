import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../EntitiesStyles/newObjectStyles.css";
import { FiUserPlus, FiCornerDownLeft } from "react-icons/fi";

export default function NewProduct(){

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(Number);
    const [imageUrl, setImageUrl] = useState('');
    const [stock, setStock] = useState(Number);
    const [registerDate, setRegisterDate] = useState('');
    const [categoryId, setCategoryId] = useState(Number);

    const {productId} = useParams();

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
	const authorization = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

    useEffect(() => {
		if (productId === '0')
			return;
		else
			loadProduct();
	}, [productId])

	async function loadProduct() {
		try {
			const response = await api.get(`api/Product/${productId}`, authorization);
			setId(response.data.id);
			setName(response.data.name);
            setDescription(response.data.description);
            setPrice(response.data.price);
			setImageUrl(response.data.imageUrl);
            setStock(response.data.stock);
            setRegisterDate(response.data.registerDate);
            setCategoryId(response.data.categoryId);
		} catch (error) {
			alert("Erro ao recuperar o produto" + error);
			navigate("/Products");
		}
	}

	async function saveOrUpdate(event) {
		event.preventDefault();

		const data = {
			name,
			description,
			price,
			imageUrl,
			stock,
			registerDate,
			categoryId
		}

		try {
			if (productId === '0') {
				await api.post('api/Product', data, authorization);
			} else {
				data.id = id;
				await api.put(`api/Product/${id}`, data, authorization);
			}
		} catch (error) {
			alert("Erro ao gravar produto" + error)
		}
		navigate('/Products');
	}

    return(
        <div className="new-object-container">
            <div className="content">
				<section className="form">
					<FiUserPlus size="105" color="#17202a" />
					<h1>{productId === '0' ? 'Incluir Novo Produto' : 'Atualizar Produto'}</h1>
					<Link className="back-link" to="/Products">
						<FiCornerDownLeft size="25" color="#17202a" />
						Retornar
					</Link>
				</section>
				<form onSubmit={saveOrUpdate}>
					<input placeholder="Nome"
						value={name} onChange={c => setName(c.target.value)}
					/>
					<input type="text" placeholder="Descrição"
						value={description} onChange={c => setDescription(c.target.value)}
					/>
					<input placeholder="Preço"
						value={price} onChange={c => setPrice(c.target.value)}
					/>
					<input placeholder="Url da Imagem"
						value={imageUrl} onChange={c => setImageUrl(c.target.value)}
					/>
					<input placeholder="Estoque"
						value={stock} onChange={c => setStock(c.target.value)}
					/>
					<input type="datetime-local" placeholder="Data de Registro"
						value={registerDate} onChange={c => setRegisterDate(c.target.value)}
					/>
					<input placeholder="Id da categoria"
						value={categoryId} onChange={c => setCategoryId(c.target.value)}
					/>
					<button className="button" type="submit">{productId === '0' ? 'Incluir' : 'Atualizar'}</button>
				</form>
			</div>
        </div>
    )
}