import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
//import Table from 'react-bootstrap/Table';
import DeleteTransaction from "./delete";
import './cTransaction.css';
import Navbar from "../navbar/customerNavbar";

function Transaction() 
{
    const [transfers, setTransfers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => 
    {
        const fetchTransactions = async () => 
        {
            try
            {
                const token = localStorage.getItem('token');

                const response = await axios.get('/api', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTransfers(response.data);
            }
            catch(err)
            {
                setError('Not authourized to view transactions');
            }
        }
        fetchTransactions();
    }, []);
    
    return(
        <>
        <div>
            <Navbar/>
            <h1>Transactions</h1>
            <br/>
            <NavLink to="/create" className="btnNew">New Transaction</NavLink><br/><br/>
            {error ? <p style={{color: 'red'}}> 
                {error} 
            </p> : transfers.length > 0 ? <ul>
                {transfers.map(transfer => <li key={transfer._id} className="item">
                    <h2>Amount: {transfer.amount}</h2>
                    <p>Currency: {transfer.currency}</p>
                    <p>Reference: {transfer.reference}</p>
                    <p>Status: {transfer.status}</p>
                    <p>Date: <i>{transfer.date}</i></p>
                    <NavLink to={`/deletectransaction/${transfer._id}`} className="btnDelete">Delete</NavLink>
                </li>)}
            </ul> : <p>transfers coming up</p>}
            <br/>
        </div>
        </>
    );
}

export default Transaction;