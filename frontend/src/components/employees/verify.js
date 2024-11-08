import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './verify.css';
import Navbar from "../navbar/staffNavbar";

const statuses = ["Pending", "Verified"];

function Verify()
{
    const [accountNumber, setAccountNumber] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [swiftCode, setSwiftCode] = useState("");
    const [amount, setAmount] = useState("");
    const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
    const [receiverSwiftCode, setReceiverSwiftCode] = useState("");
    const [reference, setReference] = useState("");
    const [transactionStatus, setTransactionStatus] = useState(statuses[0]);

    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { id } = useParams();

    const verifyTransaction = async() =>
    {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/${id}`, { 
            headers: 
            { 
                Authorization: `Bearer ${token}` 
            }
        });
        const data = await response.json();

        console.log(data);

        setAccountNumber(data.accountNumber);
        setSwiftCode(data.swiftCode);
        setSelectedCurrency(data.currency);
        setAmount(data.amount);
        setReceiverAccountNumber(data.receiverAccountNumber);
        setReceiverSwiftCode(data.receiverSwiftCode);
        setReference(data.reference);
        setTransactionStatus(statuses[0]);
    }

    useEffect(() => 
    {
        verifyTransaction();
    }, []);

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        
        try
        {
            const token = localStorage.getItem("token");
            await axios.put(`/api/${id}`, 
            {
                status: transactionStatus
            }, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Trans Status: "+transactionStatus);
            navigate("/transaction")
        }
        catch(error)
        {
            setError("Verfication failed: " +error);
        }
    }

    return(
        <>
        <div>
            <Navbar/>
            <h1>Verification Page</h1>
            <form onSubmit={handleSubmit} className="transDetailsForm">
                <label htmlFor='AccNumber'>Account Number</label><br/>
                <input type="text" id='AccNumber' name="AccNumber" value={accountNumber} className="transDetails" disabled/><br/>

                <label htmlFor='swiftCode'>Swift Code/BIC Number</label><br/>
                <input type="text" id='swiftCode' name="swiftCode" value={swiftCode} className="transDetails" disabled/><br/>

                <label htmlFor='amount'>Amount</label><br/>
                <input type="text" id='amount' name="amount" value={amount} className="transDetails" disabled/><br/>
                
                <label htmlFor='selectedCurrency'>Currency</label><br/>
                <input type="text" id='selectedCurrency' name="selectedCurrency" value={selectedCurrency} className="transDetails" disabled/><br/> 
                
                <label htmlFor='receiverAccountNumber'>Receiver Account Number</label><br/>
                <input type="text" id='receiverAccountNumber' name="receiverAccountNumber" value={receiverAccountNumber} className="transDetails" disabled/><br/>

                <label htmlFor='receiverSwiftCode'>Receiver Swift Code</label><br/>
                <input type="text" id='receiverSwiftCode' name="receiverSwiftCode" value={receiverSwiftCode} className="transDetails" disabled/><br/>

                <label htmlFor='reference'>Reference</label><br/>
                <input type="text" id='reference' name="reference" className="transDetails" value={reference} onChange={(e) => setReference(e.target.value)} disabled/><br/>
                
                <div>
                <label htmlFor='transactionStatus'>Transaction Status</label><br/>
                {/* <input type="text" id='transactionStatus' name="transactionStatus" value={transactionStatus} disabled/><br/>  */}  
                    <select className="transDetails" value={transactionStatus} onChange={e => setTransactionStatus(e.target.value)} autoFocus>
                        {statuses.map(status => <option key={status} value={status}>
                            {status}
                        </option>)}
                    </select>
                </div>

                <button onClick={() => navigate("/transaction")} className="btnCancel">Cancel</button>
                <button type="submit" className="btnVerify">Verify</button>

            </form>
        </div>
        </>
    );
}

export default Verify;