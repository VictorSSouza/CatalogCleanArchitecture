import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../EntitiesStyles/newObjectStyles.css";
import { FiUserPlus, FiCornerDownLeft } from "react-icons/fi";

export default function NewCategory() {

	const [id, setId] = useState(null);
	const [name, setName] = useState('');
	const [imageUrl, setImageUrl] = useState('');

	const { categoryId } = useParams();

	const navigate = useNavigate();

	const token = localStorage.getItem('token');
	const authorization = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	useEffect(() => {
		if (categoryId === '0')
			return;
		else
			loadCategory();
	}, [categoryId])

	async function loadCategory() {
		try {
			const response = await api.get(`api/Category/${categoryId}`, authorization);
			setId(response.data.id);
			setName(response.data.name);
			setImageUrl(response.data.imageUrl);
		} catch (error) {
			alert("Erro ao recuperar a categoria" + error);
			navigate("/Categories");
		}
	}

	async function saveOrUpdate(event) {
		event.preventDefault();

		const data = {
			name,
			imageUrl
		}

		try {
			if (categoryId === '0') {
				await api.post('api/Category', data, authorization);
			} else {
				data.id = id;
				await api.put(`api/Category/${id}`, data, authorization);
			}
		} catch (error) {
			alert("Erro ao gravar categoria" + error)
		}
		navigate('/Categories');
	}

	return (
		<div className="new-object-container">
			<div className="content">
				<section className="form">
					<FiUserPlus size="105" color="#17202a" />
					<h1>{categoryId === '0' ? 'Incluir Nova Categoria' : 'Atualizar Categoria'}</h1>
					<Link className="back-link" to="/Categories">
						<FiCornerDownLeft size="25" color="#17202a" />
						Retornar
					</Link>
				</section>
				<form onSubmit={saveOrUpdate}>
					<input placeholder="Nome"
						value={name} onChange={c => setName(c.target.value)}
					/>
					<input placeholder="Url da Imagem"
						value={imageUrl} onChange={c => setImageUrl(c.target.value)}
					/>
					<button className="button" type="submit">{categoryId === '0' ? 'Incluir' : 'Atualizar'}</button>
				</form>
			</div>
		</div>
	)
}