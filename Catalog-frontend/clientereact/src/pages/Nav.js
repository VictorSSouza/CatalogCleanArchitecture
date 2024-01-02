import {Link} from "react-router-dom";
import { FiCornerDownRight } from "react-icons/fi";
import LogoInsert from "../assets/formulario.png";

export default function Nav(){

    const email = localStorage.getItem('email');

    return(
        <>
            <img src={LogoInsert} alt="Cadastro" />
            <span>Bem-vindo, <strong>{email}</strong>!</span>
            <Link className="button" to="/Categories">
                <FiCornerDownRight size={25} color="#17202a" />
                Categorias
            </Link>
            <Link className="button" to="/Products">
                <FiCornerDownRight size={25} color="#17202a" />
                Produtos
            </Link>
        </>
    )
}