import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import logo from './assets/formulario.png';


function App() {

	const baseUrl = "https://localhost:44336/api/Product";

	const [data, setData] = useState([]);
	const [updateData, setUpdateData] = useState(true);
	const [modalInsert, setModalInsert] = useState(false);
	const [modalEdit, setModalEdit] = useState(false);
	const [modalDelete, setModalDelete] = useState(false);

	const [productSelected, setProductSelected] = useState({
		id: '',
		name: '',
		description: '',
		price: '',
		imageUrl: '',
		stock: '',
		registerDate: '',
		categoryId: ''
	})

	const productSelect = (product, option)=>{
		setProductSelected(product);
		   (option === "Editar") ?
		   openCloseModalEdit() : openCloseModalDelete();
	}
	
	const openCloseModalInsert = () => {
		setModalInsert(!modalInsert);
	}

	const openCloseModalEdit = () => {
		setModalEdit(!modalEdit);
	}

	const openCloseModalDelete = () => {
		setModalDelete(!modalDelete);
	}

	const handleChange = e => {
		const { name, value } = e.target;
		setProductSelected({
			...productSelected, [name]: value
		});
		console.log(productSelected);
	}

	const requestGet = async () => {
		try {
			const response = await axios.get(baseUrl);
			setData(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	const requestPost = async () => {
		delete productSelected.id;
		productSelected.price = parseFloat(productSelected.price).toFixed(2);
		productSelected.stock = parseInt(productSelected.stock);
		productSelected.categoryId = parseInt(productSelected.categoryId);
		await axios.post(baseUrl, productSelected)
			.then(response => {
				setData(data.concat(response.data));
				setUpdateData(true);
				openCloseModalInsert();
			}).catch(error => {
				console.log(error);
			})
	}

	const requestPut = async () => {
		await axios.put(baseUrl+"/"+productSelected.id, productSelected)
		.then(response=>{
			var reply = response.data;
			var dataAuxiliares = data;
			dataAuxiliares.map(product => {
				if(product.id===productSelected.id){
					product.name = reply.name;
					product.description = reply.description;
					product.price = reply.price;
					product.imageUrl = reply.imageUrl;
					product.stock = reply.stock;
					product.registerDate = reply.registerDate;
					product.categoryId = reply.categoryId;
				}
			});
			setUpdateData(true);
			openCloseModalEdit();
		}).catch(error=>{
			console.log(error);
		})
	}
	const requestDelete = async()=>{
		await axios.delete(baseUrl+"/"+productSelected.id)
		.then(response=>{
		  setData(data.filter(product => product.id !== response.data));
		  setUpdateData(true);
		  openCloseModalDelete();
		}).catch(error=>{
		  console.log(error);
		})
	  }

	useEffect(() => {
		if (updateData) {
			requestGet();
			setUpdateData(false);
		}
	}, [updateData])

	return (
		<div className="product-container">
			<br />
			<h1>Cadastro de Produtos</h1>
			<header>
				<img src={logo} alt="cadastro" />
				<button className="btn btn-success" onClick={()=>openCloseModalInsert()}>Incluir Produto</button>
			</header>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Id</th>
						<th>Nome</th>
						<th>Descrição</th>
						<th>Preço</th>
						<th>Url da imagem</th>
						<th>Estoque</th>
						<th>Data de registro: </th>
						<th>CategoriaId</th>
						<th>Operação</th>
					</tr>
				</thead>
				<tbody>
					{data.map(product => (
						<tr key={product.id}>
							<td>{product.id}</td>
							<td>{product.name}</td>
							<td>{product.description}</td>
							<td>{product.price}</td>
							<td>{product.imageUrl}</td>
							<td>{product.stock}</td>
							<td>{product.registerDate}</td>
							<td>{product.categoryId}</td>
							<td>
								<button className="btn btn-primary" onClick={() =>productSelect(product, "Editar")}>Editar</button>{" "}
								<button className="btn btn-danger" onClick={() =>productSelect(product, "Excluir")}>Excluir</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{/*Incluir Produtos*/}
			<Modal isOpen={modalInsert}>
				<ModalHeader>Incluir Produtos</ModalHeader>

				<ModalBody>
					<div className="form-group">
						<label>Nome: </label><br />
						<input type="text" className="form-group" name="name" onChange={handleChange} />
						<br />
						<label>Descrição: </label><br />
						<input type="text" className="form-group" name="description" onChange={handleChange} />
						<br />
						<label>Preço: </label><br />
						<input type="text" className="form-group" name="price" onChange={handleChange} />
						<br />
						<label>Url da imagem: </label><br />
						<input type="text" className="form-group" name="imageUrl" onChange={handleChange} />
						<br />
						<label>Estoque: </label><br />
						<input type="text" className="form-group" name="stock" onChange={handleChange} />
						<br />
						<label>Data de registro: </label><br />
						<input type="datetime-local" className="form-group" name="registerDate" onChange={handleChange} />
						<br />
						<label>Id da categoria: </label><br />
						<input type="text" className="form-group" name="categoryId" onChange={handleChange} />
					</div>
				</ModalBody>

				<ModalFooter>
					<button className="btn btn-primary" onClick={() => requestPost()}>Incluir</button>{" "}
					<button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
				</ModalFooter>
			</Modal>
      			{/*Editar Produto*/}
			<Modal isOpen={modalEdit}>
				<ModalHeader>Editar Produto</ModalHeader>
				<ModalBody>
					<div className="form-group">
						<label>Id: </label><br />
						<input type="text" className="form-group"
							readOnly value={productSelected && productSelected.id} />
						<br />
						<label>Nome: </label><br />
						<input type="text" className="form-group" name="name" onChange={handleChange} 
							value={productSelected && productSelected.name} />
						<br />
						<label>Descrição: </label><br />
						<input type="text" className="form-group" name="description" onChange={handleChange}
							value={productSelected && productSelected.description} />
						<br />
						<label>Preço: </label><br />
						<input type="text" className="form-group" name="price" onChange={handleChange}
							value={productSelected && productSelected.price} />
						<br />
						<label>Url da imagem: </label><br />
						<input type="text" className="form-group" name="imageUrl" onChange={handleChange}
							value={productSelected && productSelected.imageUrl} />
						<br />
						<label>Estoque: </label><br />
						<input type="text" className="form-group" name="stock" onChange={handleChange}
							value={productSelected && productSelected.stock} />
						<br />
						<label>Data de registro: </label><br />
						<input type="datetime-local" className="form-group" name="registerDate" onChange={handleChange}
							value={productSelected && productSelected.registerDate} />
						<br />
						<label>Id da categoria: </label><br />
						<input type="text" className="form-group" name="categoryId" onChange={handleChange}
							value={productSelected && productSelected.categoryId} />
					</div>
				</ModalBody>
				
				<ModalFooter>
					<button className="btn btn-primary" onClick={()=>requestPut()}>Editar</button>{" "}
					<button className="btn btn-danger" onClick={()=>openCloseModalEdit()}>Cancelar</button>
				</ModalFooter>
			</Modal>
      		{/*Excluir Produto*/}
			<Modal  isOpen={modalDelete}>
				<ModalBody>
				Confirma a <strong>exclusão</strong> deste produto: {productSelected && productSelected.name}
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-primary" onClick={()=>requestDelete()}>Excluir</button>{" "}
					<button className="btn btn-danger" onClick={()=> openCloseModalDelete()}>Cancelar</button>
				</ModalFooter>
			</Modal>
			
		</div>
	);
}

export default App;