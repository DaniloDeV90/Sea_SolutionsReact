import axios from "axios";

export const instancia = axios.create({
    baseURL: 'https://seasolutionschallenge-production.up.railway.app',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});