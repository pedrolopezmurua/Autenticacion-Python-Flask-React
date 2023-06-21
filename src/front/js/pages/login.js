import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()


    const handleClick = () => {
        actions.login(email, password)
    }

    if(store.token && store.token != "" && store.token != undefined) navigate("/")

    return (
        <div className="container-fluid text-center">
            <h1>Login here!</h1>
            {(store.token && store.token != "" && store.token != undefined) ? ("You are logged in with this token " + store.token) :
                (<div>
                    <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                    <input type="password" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                    <button className="btn btn-primary" onClick={handleClick}>Login</button>
                </div>)
            }
        </div>

    );
};