import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './navbar.css';
import logo from '../assets/global.png';

const Navbar = () => 
{
    const [search, setSearch] = useState('');
    //const [role, setRole] = useState('');

    return(
        <div className="navbar">
            <nav>
                <img src={logo} alt="Logo"/>
                {/* <h3>Tranquil International</h3> */}
                <ul>
                    <li>
                        <NavLink to="/shome" className="nav-items">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users" className="nav-items">Users</NavLink>
                    </li>
                    <li>
                    <NavLink to="/transaction" className="nav-items">Transaction</NavLink>
                    </li>
                    <li>
                    <NavLink to="#" className="nav-items">History</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className="nav-items"></NavLink>
                    </li>
                </ul>
                <input type="text" name="search" className="searchbox" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} />
            </nav>
        </div>
    );
}

export default Navbar;