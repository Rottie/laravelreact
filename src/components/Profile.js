import React ,{ useState, useEffect  }  from "react";

import { useLocation, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

import UserService from "../services/user.service";

const Profile = () => {


  //useLocation hook is used to access the current location state
  const location = useLocation();
  //Gain current user info after success login
  const { email, password,id,userName } = location.state || {};
  
   //init state using useState hooks
  //store update name,email,pwd on state
  //message store err or success msg
  const [newName, setNewName] = useState(userName);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState(password);
  const [message, setMessage] = useState("");

   // useNavigate hook is used for navigation
   const navigate = useNavigate();

  //Logout Logic flow
  const handleSignout = () => {
    AuthService.signout()
    navigate("/");
  };
 


  //Update user name,email,password
  const handleUpdate = () => {
    UserService.updateUser(id, newName, newEmail, newPassword)
      .then(() => {
        setMessage("Update successful");
       // Redirect to the profile page or perform any other necessary actions after successful login
            navigate("/profile", { state: { email: newEmail, password: newPassword, id, userName: newName } });
            window.location.reload();

      })
      .catch((error) => {
        setMessage(error.message);
      });
  };
  

   // Update ui name,email,pwd real time every update operation
   //calling getUser api to get update info based current id,
   useEffect(() => {
    UserService.getUser(id)
      .then((response) => {
        const { name, email, password } = response.data;
        setNewName(name);
        setNewEmail(email);
        setNewPassword(password);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);
  
  return (
    <div className="container">
      <h1>User Profile</h1>

      {/* UserName */}
      <div className="mb-3">
        <label  >Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>

      {/* User Email */}
      <div className="mb-3">
        <label >Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>

      {/* User password */}
      <div className="mb-3">
        <label >Password:</label>
        <input
          type="text"
          className="form-control"
          id="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      {/* Update button */}
      <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
      
      {/* SignOut Button */}
      <button className="btn btn-danger" onClick={handleSignout}>Sign out</button>
     
     {/* Display success or err msg */}
      <p>{message}</p>
    </div>
  );
};

export default Profile;