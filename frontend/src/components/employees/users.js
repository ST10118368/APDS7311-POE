import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
//import Table from 'react-bootstrap/Table';
import './transaction.css';
import Navbar from "../navbar/staffNavbar";

function Users() 
{
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => 
    {
        const fetchUsers = async () => 
        {
            try
            {
                const token = localStorage.getItem('token');

                const response = await axios.get('/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            }
            catch(err)
            {
                setError('Not authourized to view users');
            }
        }
        fetchUsers();
    }, []);
    
    return(
        <>
        <div>
            <Navbar/>
            <h1>Users</h1>
            <br/>
            <NavLink to={`/adduser`} className="btnUser">New User</NavLink>
            <br/>
            {error ? <p style={{color: 'red'}}> 
                {error} 
            </p> : users.length > 0 ? <ul>
                {users.map(users => <li key={users._id} className="item">
                    <h2>Full Name: {users.fullName}</h2>
                    <p>ID: {users.idNumber}</p>
                    <p>Account No.: <i>{users.accountNumber}</i></p>
                    <p>Email: {users.email}</p>
                    <NavLink to={`/deleteuser/${users._id}`} className="btnDelete">Delete</NavLink>
                    <NavLink to={`/userdetails/${users._id}`} className="btnVerify">Edit</NavLink>
                </li>)}
            </ul> : <p>Users coming up</p>}
            <br/>
        </div>
        </>
    );
}

export default Users;