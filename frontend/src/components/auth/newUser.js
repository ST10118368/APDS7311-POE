import React,  {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../employees/verify.css';

function AddUser()
{
    const userTypes = ["1", "2"];

    //Setting state/declaration
    const [fullName, setFullName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [userType, setUserType] = useState(userTypes[0]);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    //Setting function to not use default get method on form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        console.log("User-Input: ", {fullName, idNumber, accountNumber, email, password, userType});
        try
        {
            const response = await axios.post('/api/auth/register', {fullName, idNumber, accountNumber, email, password, userType});
            console.log("Response: ", response);
            if (response.status === 201)
            {
                navigate('/users');
            }
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


    return(
        <>
        <div className="register-container">
            <h1>Add User</h1>
            <br/>

            {/* New user form */}
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

                <button type="submit" className="btnRegister">Add User</button>
            </form>
        </div>
        </>
    );
}

export default AddUser;