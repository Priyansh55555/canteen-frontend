import toast from "react-hot-toast";
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
    }
} 