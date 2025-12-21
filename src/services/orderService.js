import { Axios } from "../App"


let debug = true;

// payload 
// _id: ""
// quantity: 12
export const OrderService = {
    placeOrder: async (body) => {
        try {
            const response = await Axios.post('/order', body);
            if(debug)
                console.log("axios data", response);
            return response.data;
        }catch(err){
            if(debug)
                console.log("axios error", err.response);
            throw err;
        }
    }, getUserOrders: async () => {
            try {
                const response = await Axios.get('/order/user');
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