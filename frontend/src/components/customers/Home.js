import React from "react";
import {useNavigate} from 'react-router-dom';
import './Home.css';

function Home()
{
    const navigate = useNavigate();

    return(
        <>
        <div className="home-container">
            <div className="title">
                <h1>Welcome to Tranquil International Payment System</h1>
            </div>

            <p>Securely transfer funds globally</p>

            <div className="button-div">
                <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
                <button className="btn-register" onClick={() => navigate("/register")}>Register</button>
            </div>
        </div>
        </>
    );
}

export default Home;