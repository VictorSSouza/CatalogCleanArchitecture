export default function Validation(data){
    const errors = {};

    if(!data.email){
        errors.email = "Email é obrigatório";
    }

    if(!data.password){
        errors.password = "Senha é obrigatória";
    }

    if(!data.confirmPassword){
        errors.confirmPassword = "Senha é obrigatória";
    }

    return errors;
}