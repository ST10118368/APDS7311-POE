import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
//import Table from 'react-bootstrap/Table';
import './transaction.css';
import Navbar from "../navbar/staffNavbar";

function Transactions() 
{
    const [transactions, setTransactions] = useState([]);
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
                setTransactions(response.data);
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
            {error ? <p style={{color: 'red'}}> 
                {error} 
            </p> : transactions.length > 0 ? <ul>
                {transactions.map(transactions => <li key={transactions._id} className="item">
                    <h2>Amount: {transactions.amount}</h2>
                    <p>Currency: {transactions.currency}</p>
                    <p>Reference: {transactions.reference}</p>
                    <p>Status: {transactions.status}</p>
                    <p>Date: <i>{transactions.date}</i></p>
                    <NavLink to={`/transactiondetails/${transactions._id}`} className="btnVerify">Verify</NavLink>
                </li>)}
            </ul> : <p>Transactions coming up</p>}
            <br/>
        </div>
        </>
    );
}

export default Transactions;