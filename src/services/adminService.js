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
    }, 
    getAllOrders: async () => {
        try {
            const response = await Axios.get('/admin/orders');
            if(debug)
                console.log("axios data", response);
            return response.data;
        }catch(err){
            if(debug)
                console.log("axios error", err.response);
            throw err;
        }
    },
    updateOrderStatus: async (id, newStatus) => {
        try {
            const response = await Axios.put('/admin/order/' + id + '/status', { status: newStatus });
            if(debug)
                console.log("axios data", response);
            return response.data;
        }catch(err){
            if(debug)
                console.log("axios error", err.response);
            throw err;
        }
    }, 
} 