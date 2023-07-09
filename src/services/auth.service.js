import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

//Input name,email,password,success return sucess msg or vice versa
const register = (name, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
  });
};

//Input name,email,password,success return sucess msg or vice versa

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    //return token data and user data
    .then((response) => {
      if (response.data.token) {

        //gain user data(id,name,email)
        const user = response.data.user;
        console.log("User Details:",user.id, user.name, user.email, user.password);
        //save in local storage 
        localStorage.setItem("user", JSON.stringify(user));
        return { user, response: response.data };
      }
    })
    .catch((error) => {
      console.error("Login Error", error);
      throw error; // Optional: rethrow the error to handle it elsewhere
    });
};


const signout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('authToken');

};


const AuthService = {
  register,
  login,
  signout,

  
};

export default AuthService;