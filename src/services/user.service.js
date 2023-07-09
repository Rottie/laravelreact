import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/users/";

 //Update user name,email,password on backend
const updateUser = (id, name, email, password) => {
  return axios.put(API_URL + id, {
    name,
    email,
    password,
  }); 
};

//Display the user name,email,password on frontend ui dynamically for every time update
const getUser = (id) => {
  return axios.get(API_URL + id);
};



const UserService = {
  updateUser,
  getUser,
};

export default UserService;