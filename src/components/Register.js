import React, { useState, useRef } from "react";

//Import form,input,check button from react validation
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

// Import the email validator from the validator library
import { isEmail } from "validator";

// Import the AuthService to handle registration
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

//Using value.length to check the input value length
//If  not input name less than 3 or more than 10  then display msg
const vusername = (value) => {
  if (value.length < 3 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 10 characters.
      </div>
    );
  }
};

//Using value.length to check the input value length
//If  not input name less than 6 or more than 15  then display msg
const vpassword = (value) => {
  if (value.length < 6 || value.length > 15) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 15 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();


  //init state using useState hooks
  //username,email,pwd,succ reg status, error msg during reg
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

    // Even handler update username state var based value enter in usrname input field
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
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

  //This function call if form submitted
  const handleRegister = (e) => {

        //prevent default form submission behaviour
        //reload page or navigate to new page
        //manual submit using custom logic(make api req)
    e.preventDefault();
    //reset meassage state
    setMessage("");
    setSuccessful(false);

       
    //call Form validateAll method on form ref object 
    // to check validation function in validations
    form.current.validateAll();

        // check button helps verify form validation is success or not

    if (checkBtn.current.context._errors.length === 0) {

      // if success call register api
      AuthService.register(username, email, password).then(
        (response) => {
          //return api message on msg state var
          setMessage(response.data.message);
          setSuccessful(true);
        },
   // if error update state msg with error msg
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
     
       {/* Form*/}
     {/* ref attribute set the form ref obect to access form method */}
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              {/* name */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
 
              {/* email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              {/* password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
             
             {/* SignUp Button */}
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}


          
         {/*err msg UI as if err occur display an alert  */}
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
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

export default Register;