import axios from 'axios';

// Configura la URL base del backend
const BASE_URL = 'https://vortex-backend-06sc.onrender.com'; // Cambia esto por la URL de tu backend en producción
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export default axios;
