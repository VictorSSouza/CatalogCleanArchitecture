import { useNavigate } from "react-router-dom";
import { FiXCircle } from "react-icons/fi";

export default function Logout() {
    
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    async function logout(){
        try {
            localStorage.clear();
            localStorage.setItem('token', '')
            authorization.headers = '';
            navigate('/');
        }
        catch (error) {
            alert("Não é possível fazer o logout" + error);
        }
    }
    
    return (
        <>
          <button onClick={logout} title="Sair da Conta" type="button" >
            <FiXCircle size={40} color="#17202a" />
          </button>
        </>
    )
}