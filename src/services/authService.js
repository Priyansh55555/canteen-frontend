import toast from "react-hot-toast";
import { Axios } from "../App"

let debug = true;

export const AuthService = {
    register: async (body) => {
        try {
            const response = await Axios.post('/auth/register', body);
            if(debug)
                console.log("axios data", response);
            return response.data;
        }catch(err){
            if(debug)
                console.log("axios error", err.response);
            throw err;
        }
    },
    login: async (body) => {
        try {
            const response = await Axios.post('/auth/login', body);
            if(debug)
                console.log("axios data", response);
            return response.data;
        }catch(err){
            if(debug)
                console.log("axios error", err.response);
            throw err;
        }
    },
    logout: async (body) => {
        try {
            const response = await Axios.post('/auth/logout', body);
            if(debug)
                console.log("axios data", response);
            return response.data;
        }catch(err){
            if(debug)
                console.log("axios error", err.response);
            throw err;
        }
    },
    getUser: async () => {
        try {
            const response = await Axios.get('/auth/get-user');
            if(debug)
                console.log("axios data", response);
            return response.data;
        }catch(err){
            if(debug)
                console.log("axios error", err.response);
            throw err;
        }
    }
} 