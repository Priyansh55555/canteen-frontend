import { Axios } from "../App"

let debug = true;

export const MenuService = {
    getAllMenu : async () => {
        try {
            const response = await Axios.get('/menu/');
            if(debug)
                console.log("axios data", response);
            return response.data;
        }catch(err){
            if(debug)
                console.log("axios error", err.response);
            throw err;
        }
    },
    getAllMenuLandingPage : async () => {
        try {
            const response = await Axios.get('/menu/landing');
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