import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

// Using form,input,checkbutton from react validation library
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

// this function from validatio to verify email
import { isEmail } from "validator";

//Call login  api
import AuthService from "../services/auth.service";


//This function check if a value is empty,if yes reurn err msg
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


//Using isEmail from validator to check if valuye is valid email
//if err then return err msg
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};



const Login = () => {
  let navigate = useNavigate();


  //Declarre form & btn var using use ref hooks
  const form = useRef();
  const checkBtn = useRef();
  
  //init state using useState hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  //Call this function when form is submited
  const handleLogin = (e) => {
    
        //prevent default form submission behaviour
        //reload page or navigate to new page
        //manual submit using custom logic(make api req)
    e.preventDefault();
    
    //reset meassage state
    setMessage("");

    setLoading(true);
   
    //call Form validateAll method on form ref object 
    // to check validation function in validations
    form.current.validateAll();

    // check button helps verify form validation is success or not
    if (checkBtn.current.context._errors.length === 0) {
      //Call this login api if validation success
      //Input 2 params email,password to this api
      AuthService.login(email, password).then(
        //success default return token value
        //but extra treturn user data contain id &name
        //so that usernmae can display on next profile page
        ({ user}) => {
          const  id = user.id
          const userName = user.name;
          
          //after api success login then navigate to profile page
          //bring with input email,password and login api return id and usernmae
         navigate("/profile",{ state: { email, password ,id,userName} });
          console.log("Login OK")
        },

        // if error update state msg with error msg
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };


  // Even handler update email state var based value enter in email input field
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };


  // Even handler update pwd state var based value enter in pwd input field
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
    
     
     {/* Form*/}
     {/* ref attribute set the form ref obect to access form method */}
        <Form onSubmit={handleLogin} ref={form}>

       {/*Input component fot Email fields */}
        <div className="form-group">
                <label >Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  // validations prop provides an array validation
                  //to perform input field
                  validations={[required, validEmail]}
                />
              </div>

         {/* Input component fot pwd fields */}
          <div className="form-group">
            <label >Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
         
         {/* Login Button disbale if loading state is true 
           & loading spinner display
         */}
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          

          {/*err msg UI as if err occur display an alert  */}
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}

          {/* This checkbtn component used validate form
             trigger form validation
             check all validation ruled defined & collect validation err
             if not validation err ,form submission can process
             otherwise validation err display to user

             display none made hidden but still functional perform validation
            
          */}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;