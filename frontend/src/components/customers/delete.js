import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
import './delete.css';
import Navbar from "../navbar/customerNavbar";

function DeleteTransaction()
{
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => 
    {
        try
        {
            const token = localStorage.getItem("token");
            await axios.delete(`/api/${id}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/ctransaction");
        }
        catch(err)
        {
            console.error("Deletion failed: ", err);
        }
    };

    return(
        <>
        <div>
            <Navbar/>
            <h2>Delete Transaction</h2>
            <p>Are you sure you want to delete transaction?</p><br/>
            <button onClick={handleDelete} className="btnTransDelete">Delete</button>
            <button onClick={() => navigate("/ctransaction")} className="btnCancelDeletion">Cancel</button>
        </div>
        </>
    );
}

export default DeleteTransaction;