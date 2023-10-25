import axios from "axios";

export const instancia = axios.create({
    baseURL: 'https://sea-solutions-n71x.onrender.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});