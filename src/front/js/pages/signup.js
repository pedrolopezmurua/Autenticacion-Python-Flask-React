import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        actions.signup(email, password)
    }

    useEffect(()=>{
        if (store.token && store.token!="" && store.token!=undefined) {
            navigate("/");
        }
    }, [store.token, navigate])

    return (
        <div className="container text-center">
            <h1>Signup here!</h1>
            {store.token && store.token!="" && store.token!=undefined ? (
                "You are logged in with this this token: " + store.token
            ) : (
                <div>
                    <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                    <input type="password" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                    <button className="btn btn-primary" onClick={handleClick}>Signup</button>
                </div>
            )
            }
        </div>

    );
};