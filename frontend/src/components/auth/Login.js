import React, {useState} from "react";
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

function Login()
{
    //Setting state/declaration
    const [email, setEmail] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [action, setAction] = useState("Customer");
    const [customerHidden, setCustomerHidden] = useState(true);
    const [staffHidden, setStaffHidden] = useState(true);
    const navigate = useNavigate();

    //Setting function to not use default get method on form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try
        {
            const response = await axios.post('/api/auth/login', {email, accountNumber, password});
            localStorage.setItem('token', response.data.token);
            navigate('/chome');
        }
        catch(err)
        {
            if (err.response)
            {
                setError(err.response.data.message);
            }
            else
            {
                setError('Something went wrong. Please try again.');
            }
        }
    }

    //Setting function to not use default get method on form
    const handleStaffSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try
        {
            const response = await axios.post('/api/auth/slogin', {email, password});
            localStorage.setItem('token', response.data.token);

            navigate('/shome');

            // const details = await fetch(`/api/users/${email}`, {email, password});
            // const data = await details.json();

            // if(data.userType === "0")
            // {
            //     navigate('/shome');
            // }
            // else if (data.userType === "1")
            // {
            //     navigate('/shome');
            // }
            // else
            // {
            //     setError('Only emplyees allowed! Click "Customer" button for other users');
            // }

        }
        catch(err)
        {
            if (err.response)
            {
                setError(err.response.data.message);
            }
            else
            {
                setError('Something went wrong. Please try again.');
            }
        }
    }

    //Setting staff form visibility form
    function handleStaffForm()
    {
        setAction('Staff');
        setCustomerHidden(true);
        setStaffHidden(false);
    }

    //Setting customer form visibility form
    function handleCustomerForm() 
    {
        setAction('Customer');
        setCustomerHidden(false);
        setStaffHidden(true);
    }

    return(
        <>
        <h1>{action} Login</h1>
        <br/>

        <div>
            <button className="customerLoginTab" onClick={handleCustomerForm}>Customer</button>
            <button className="staffLoginTab" onClick={handleStaffForm}>Staff</button>
        </div>
        <br/>

        {/* Cusromers' login form */}
        <form onSubmit={handleSubmit} className="customerLoginForm" hidden={customerHidden}>
            <label htmlFor='cUsername'>Username</label><br/>
            <input type="text" id='cUsername' name="cUsername" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="true"/><br/>
            
            <label htmlFor='cAccNumber'>Account Number</label><br/>
            <input type="text" id='cAccNumber' name="cAccNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)}/><br/>
        
            <label htmlFor='cPassword'>Password</label><br/>
            <input type="password" id='cPassword' name="cPassword" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
            <br/>

            {error && <p style={{color: 'red'}}> {error} </p>}

            <button type="submit" className="btnLogin">Login</button>
        </form>
        
        {/* Employees' login form */}
        <form onSubmit={handleStaffSubmit} className="staffLoginForm" hidden={staffHidden}>
            <label htmlFor='sUsername'>Username</label><br/>
            <input type="text" id='sUsername' name="sUsername" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>

            <label htmlFor='sPassword'>Password</label><br/>
            <input type="password" id='sPassword' name="sPassword" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
            <br/>

            {error && <p style={{color: 'red'}}> {error} </p>}

            <button type="submit" className="btnLogin">Login</button>
        </form>
        </>
    );
}

export default Login;


// try
// {
//     const response = await fetch('/api/auth/login', 
//     {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({username, acountNumber, password})
//     });

//     const data = await response.json();

//     if (data.error)
//     {
//         setError(data.error);
//     }
//     else
//     {
//         localStorage.setItem('token', data.token);
//         window.location.href = '/home';
//     }
// }
// catch(err)
// {
//     if (err.response)
//     {
//         setError(err.response.data.message);
//     }
//     else
//     {
//         setError('Something went wrong. Please try again.');
//     }
// }