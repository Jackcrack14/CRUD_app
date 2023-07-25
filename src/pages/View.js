import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';


export default function View() {
    const [user,setUser] = useState({});
    const {id} = useParams();
    useEffect(() =>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) =>setUser({...resp.data[0]}))
    })
  return (
    <div>
        <div>
            <div>
                <p>Offer Details</p>
            </div>
            <div>
                <strong>Id:</strong>
                <span>{user.id}</span>
                <br />
                <br />
                <strong>Promo_Code:</strong>
                <span>{user.Promo_Code}</span>
                <br />
                <br />
                <strong>Product:</strong>
                <span>{user.Product}</span>
                <br />
                <br />
                <strong>Description:</strong>
                <span>{user.Description}</span>
                <br />
                <br />
                <strong>Expiry_Date:</strong>
                <span>{user.Expiry_date}</span>
                <br />
                <br />
                <Link to='/'>
                    <div>Return</div>
                </Link>
            </div>
        </div>
    </div>
  )
}
