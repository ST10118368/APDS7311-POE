import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
import '../customers/delete.css';
import Navbar from "../navbar/customerNavbar";

function DeleteUser()
{
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => 
    {
        try
        {
            const token = localStorage.getItem("token");
            await axios.delete(`/api/users/${id}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/users");
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
            <h2>Delete User</h2>
            <p>Are you sure you want to delete user?</p><br/>
            <button onClick={handleDelete} className="btnTransDelete">Delete</button>
            <button onClick={() => navigate("/users")} className="btnCancelDeletion">Cancel</button>
        </div>
        </>
    );
}

export default DeleteUser;