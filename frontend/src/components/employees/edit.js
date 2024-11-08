import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../employees/verify.css';

const userTypes = ["1", "2"];

function EditUser()
{
    //Setting state/declaration
    const [fullName, setFullName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [userType, setUserType] = useState(userTypes[0]);

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const editUser = async() =>
    {
        try
        {
            //console.log("Before fetch");
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/users/${id}`, { 
                headers: 
                { 
                    Authorization: `Bearer ${token}` 
                }
            });
            //console.log("After fetch: ", response);
            const data = await response.json();

            //console.log("Data: ", data);

            setFullName(data.fullName);
            setIdNumber(data.idNumber);
            setAccountNumber(data.accountNumber);
            setEmail(data.email);
            setPassword(data.password);
            setUserType(data.userType);
        }
        catch(error)
        {
            setError("Failed to fetch: " +error);
        }
        
    }

    useEffect(() => 
    {
        editUser();
    }, []);

    //Setting function to not use default get method on form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        //console.log("User-Input: ", {fullName, idNumber, accountNumber, email, password, userType});
        try
        {
            const token = localStorage.getItem("token");
            await axios.put(`/api/users/${id}`, 
            {
                fullName,
                idNumber,
                accountNumber,
                email,
                password,
                userType
            }, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("User Update: "+fullName, idNumber, accountNumber, email, password, userType);
            navigate('/users');

        }
        catch(err)
        {
            setError("Edit failed: " +err);
        }
    }


    return(
        <>
        <div className="register-container">
            <h1>Edit User</h1>
            <br/>

            {/* User form */}
            <form onSubmit={handleSubmit} className="customerRegisterForm" >
                <label htmlFor='fullname'>Fullname</label><br/>
                <input type="text" id='fullname' name="fullname" className="regDetails" value={fullName} onChange={(e) => setFullName(e.target.value)} required/><br/>
                <br/>

                <label htmlFor='idNumber'>ID Number</label><br/>
                <input type="idNumber" id='idNumber' name="idNumber" className="regDetails" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required/><br/>
                <br/>

                <label htmlFor='accNumber'>Account Number</label><br/>
                <input type="text" id='accNumber' name="accNumber" className="regDetails" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required/><br/>
                <br/>

                <label htmlFor='email'>Email</label><br/>
                <input type="email" id='email' name="email" className="regDetails" value={email} onChange={(e) => setEmail(e.target.value)} required/><br/>
                <br/>

                <label htmlFor='password'>Password</label><br/>
                <input type="password" id='password' name="password" className="regDetails" value={password} onChange={(e) => setPassword(e.target.value)} required/><br/>
                <br/>

                <div>
                <label htmlFor='userType'>UserType</label><br/>  
                    <select className="regDetails" value={userType} onChange={e => setUserType(e.target.value)}>
                        {userTypes.map(types => <option key={types} value={types}>
                            {types}
                        </option>)}
                    </select>
                </div>
                <br/>
                <br/>

                {error && <p style={{color: 'red'}}> {error} </p>}

                <button type="submit" className="btnRegister">Save User</button>
            </form>
        </div>
        </>
    );
}

export default EditUser;