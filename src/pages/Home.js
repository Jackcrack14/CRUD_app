import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './Home.css';
import axios from "axios";

const Home = () =>{
    const [data,setData] = useState([]);

    const loadData = async () =>{
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);

    };
    useEffect(() =>{
        loadData();
    },[]);

    const deleteData = (id) =>{
        if(window.confirm("Are you sure you want to delete?")){
            axios.delete(`http://localhost:5000/api/delete/${id}`);
            toast.success("Offer deleted Successfully");
            setTimeout(()=> loadData(),500);
        }
    }

    return (<div>
        <Link to="/addOffer">
            <button>Add Offers</button>
        </Link>
        <table>
     <thead>
         <tr>
            <th>No</th>
             <th>Promo Code</th>
             <th>Product</th>
             <th>Description</th>
             <th>Expiry date</th>
         </tr>
     </thead>
     <tbody>
        {data.map((item,index) =>( <tr key={item.id}>
            <th scope="row">{index+1}</th>
             <td>{item.Promo_Code}</td>
             <td>{item.Product}</td>
             <td>{item.Description}</td>
             <td>{item.Expiry_Date}</td>
             <td>
                <Link to={`/update/${item.id}`}>
                    <button>Edit</button>
                </Link>
                <Link to={`/view/${item.id}`}>
                    <button>view</button>
                </Link>
                <button onClick={()=> deleteData(item.id)}>Delete</button>
             </td>
         </tr>))}
        
     </tbody>
     </table>
    </div>)
}

export default Home;