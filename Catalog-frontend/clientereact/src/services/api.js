import axios from 'axios';
// url do servidor IIS express
const api = axios.create({
    baseURL : "https://localhost:44336"
})

export default api;