import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './navbar.css';
import logo from '../assets/global.png';
//import logo from '.../assets/global.png';

const Navbar = () => 
{
    const [search, setSearch] = useState('');

    return(
        <div className="navbar">
            <nav>
                <img src={logo} alt="Logo"/>
                <ul>
                    <li>
                        <NavLink to="/login" className="nav-items"></NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className="nav-items"></NavLink>
                    </li>
                    <li>
                        <NavLink to="/home" className="nav-items">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ctransaction" className="nav-items">Transaction</NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="nav-items">History</NavLink>
                    </li>
                </ul>
                <input type="text" name="search" className="searchbox" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} />
            </nav>
        </div>
    );
}

export default Navbar;