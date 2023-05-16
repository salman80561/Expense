import React, { useRef, useState } from "react";

import "./LoginForm.css";

import {useNavigate,Link} from "react-router-dom";

import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";

const LoginForm = () =>{
    const history = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const[isLoading, setIsLoading] = useState(false);
    const[password, confirmPassword] = useState(true);

    const dispatch = useDispatch();

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(event)

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        setIsLoading(true);
        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABV3Ka88_JCZGivdh4xR89-n-S_BkTf1I",{
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers:{
                    "Content-Type": "applicatio/json",
                },


            }).then((response) =>{
                confirmPassword(true);
                confirmPassword("Successful!");
                setIsLoading(false);

                if(response.ok){
                    return response.json();
                }else{
                    response.json().then((data)=>{
                        let errorMessage = "IncorrectPassword";
                        if(data && data.error && data.error.message){
                            errorMessage = data.error.message;
                        }
                        confirmPassword(errorMessage);
                        throw new Error(errorMessage);
                    });
                }
            }).then((data) => {
                console.log(data.idToken);
                if (data.idToken) {
                    localStorage.setItem("token", data.idToken);
                    dispatch(authAction.login(data.idToken));
                  }
                localStorage.setItem("email", data.email.replace(/[@.]/g, ""));
                history.replace("./home");

            }).catch((err)=>{
                console.log(err.message);
            });   
        };
        return(
            <form onSubmit={handleSubmit} className="login">
                <h2>LoginForm</h2>
                <div className = "body">
                    <div>
                        <label className="label">Email</label>
                        <input type="email" id ="email" ref={emailRef} placeholder="Email" />
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <input type="password" id="password" ref={passwordRef} placeholder="password" />
                    </div>
                    {password}
                </div>
                <div className="foo">
                    <button type="submit" className="btn">Login</button>
                    {isLoading && <p>Loading</p>}
                </div>
                <p>Have an account? <Link to ="/register">Register</Link></p>
                <Link to="/forget"><i>Forget password</i></Link>


            </form>
        )

};
export default LoginForm;