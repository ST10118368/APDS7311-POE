import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './create.css';
import Navbar from "../navbar/customerNavbar";

const statuses = ["Pending"];

const currencies = ["US Dollar", "Pound", "Euro", "Aussie Dollar", "Yen", "Rubi", "Yuan", "Swiss Franc"]

function CreateTransaction()
{
    const [accountNumber, setAccountNumber] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    const [swiftCode, setSwiftCode] = useState("");
    const [amount, setAmount] = useState("");
    const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
    const [receiverSwiftCode, setReceiverSwiftCode] = useState("");
    const [reference, setReference] = useState("");
    const [transactionStatus, setTransactionStatus] = useState(statuses[0]);
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => 
    {
        e.preventDefault();

        try
        {
            const token = localStorage.getItem("token");
            await axios.post("/api", 
            {
                accountNumber,
                swiftCode,
                amount,
                currency : selectedCurrency,
                receiverAccountNumber,
                receiverSwiftCode,
                reference
            }, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setAccountNumber("");
            setAmount("");
            setSelectedCurrency(currencies[0]);
            setReceiverAccountNumber("");
            setReceiverSwiftCode("");
            setReference("");
            setError("");
            navigate("/ctransaction");
        }
        catch(error)
        {
            setError("Transaction failed: " +error);
        }
    }

    return(
        <>
        <div>
            <Navbar/>
            <h1>New Transaction</h1>
            {error && <p style={{color: 'red'}}> {error} </p>}
            <form onSubmit={handleSubmit} className="transForm">
                <label htmlFor='AccNumber'>Account Number</label><br/>
                <input type="text" id='AccNumber' name="AccNumber" className="transData" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required/><br/>

                <label htmlFor='swiftCode'>Swift Code/BIC Number</label><br/>
                <input type="text" id='swiftCode' name="swiftCode" className="transData" value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} required/><br/>

                <label htmlFor='amount'>Amount</label><br/>
                <input type="text" id='amount' name="amount" className="transData" value={amount} onChange={(e) => setAmount(e.target.value)} required/><br/>
                
                <div>
                    <label htmlFor='currency'>Currency</label><br/>
                    {/* <input type="text" id='currency' name="currency" value={currency} onChange={(e) => setSelectedCurrency(e.target.value)} /><br/> */}
                    <select className="transData" value={selectedCurrency} onChange={e => setSelectedCurrency(e.target.value)}>
                        {currencies.map(currency => <option key={currency} value={currency}>
                            {currency}
                        </option>)}
                    </select>
                </div>

                <label htmlFor='receiverAccountNumber'>Receiver Account Number</label><br/>
                <input type="text" id='receiverAccountNumber' name="receiverAccountNumber" className="transData" value={receiverAccountNumber} onChange={(e) => setReceiverAccountNumber(e.target.value)} required/><br/>

                <label htmlFor='receiverSwiftCode'>Receiver Swift Code</label><br/>
                <input type="text" id='receiverSwiftCode' name="receiverSwiftCode" className="transData" value={receiverSwiftCode} onChange={(e) => setReceiverSwiftCode(e.target.value)} required/><br/>

                <label htmlFor='reference'>Reference</label><br/>
                <input type="text" id='reference' name="reference" className="transData" value={reference} onChange={(e) => setReference(e.target.value)} required/><br/>
                
                <button type="submit" className="btnPay">Pay Now</button>

            </form>
        </div>
        </>
    );
}

export default CreateTransaction;