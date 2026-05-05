import axios from 'axios';

let debug = true;

const userService = {
  updateUser: async (userData) => {
     try {
                const response = await axios.put('/api/user', userData);
                if(debug)
                    console.log("axios data", response);
                return response.data;
            }catch(err){
                if(debug)
                    console.log("axios error", err.response);
                throw err;
            }
  }
};

export default userService;
