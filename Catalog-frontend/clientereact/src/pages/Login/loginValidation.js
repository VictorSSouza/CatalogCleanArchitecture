export default function Validation(data){
    const errors = {};

    if(!data.email){
        errors.email = "Email é obrigatório";
    }

    if(!data.password){
        errors.password = "Senha é obrigatória";
    }

    if(!data.confirmPassword){
        errors.confirmPassword = "Confirme a senha";
    }
    if(data.confirmPassword !== data.password){
        errors.confirmPassword = "As senhas são diferentes";
    }

    return errors;
}