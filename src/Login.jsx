import { current } from "@reduxjs/toolkit";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./store";
import "./App.css"

function Login()
{
  
    let username=useRef(null);
    let password=useRef(null);
    let navigate=useNavigate();
    let dispath=useDispatch();
    const cart=useSelector(state=>state.Cart);
    
           let loginCheck=()=>{
       if(username.current.value==="siva"&&password.current.value==="123")
       {
         dispath(login(current.username)),
         cart.length>0?
         navigate("/cart"):
            navigate("/home")
       }
       else{
        alert("Invalid creditinials Please check once")
       }
           }
      


    return(
       <>
       <div className="login-continer">
    <h1>Login Page</h1>
    <label >Username:</label>
      <input
      type="text"
      ref={username}  
      placeholder="Enter your username"    
      />
      <br/><br/>
    <label>Password:</label>
    <input
      type="password"
      ref={password}  
      placeholder="Enter your Paasword"  
      />
      <br/><br/>
      <button onClick={loginCheck} className="log-button">Login</button>
       </div>
     </>


    )
}
export default Login;