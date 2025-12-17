import { Axios } from "../App"


let debug = true;

export const AdminService = {
    createFood: async (body) => {
        try {
            const response = await Axios.post('/admin/food/create', body);
            if(debug)
                console.log("axios data", response);
            return response.data;
        }catch(err){
            if(debug)
                console.log("axios error", err.response);
            throw err;
        }
    },
    updateFood: async (body , id) => {
        try {
            const response = await Axios.put('/admin/food/' + id, body);
            if(debug)
                console.log("axios data", response);
            return response.data;
        }catch(err){
            if(debug)
                console.log("axios error", err.response);
            throw err;
        }
    },
    deleteFood: async (id) => {
        try {
            const response = await Axios.delete('/admin/food/' + id);
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