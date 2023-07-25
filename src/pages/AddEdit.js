import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import {useNavigate,useParams,Link} from 'react-router-dom';
import {toast} from 'react-toastify';



export default function AddEdit() {
    const navigate = useNavigate();
    const [state,setState] = useState({
        Promo_Code:"",
        Product:"",
        Description:"",
        Expiry_Date:"",
        
    });
    const {Promo_Code,Product,Description,Expiry_Date} = state;
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) =>setState({...resp.data[0]}))

    },[id])
    function handleSubmit(e) {
        e.preventDefault();
        if(!Promo_Code || !Product || !Description || !Expiry_Date){
            toast.error("Please provide a value");
        }else{
            if (!id){
                axios.post("http://localhost:5000/api/post",{ 
                Promo_Code,
                Product,
                Description,
                Expiry_Date,
            }).then(() =>{
                setState({Promo_Code:"",Product:"",Description:"",Expiry_Date:""})
            }).catch((err) =>{
                toast.error(err.response.data)
            });
            toast.success("Offer Added Successfully")
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`,{ 
                Promo_Code,
                Product,
                Description,
                Expiry_Date,
            }).then(() =>{
                setState({Promo_Code:"",Product:"",Description:"",Expiry_Date:""})
            }).catch((err) =>{
                toast.error(err.response.data)
            });
            toast.success("Offer Updated Successfully");
            }
            
            setTimeout(() =>{
                navigate("/")},500)

        }
    };
    function addData(event){
        const{name,value} = event.target;
        setState({...state,[name]:value});
    };
  return (
    
    <div>
        <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="offer_input">Offer Code</label>
                <input type="text" placeholder="Any offers?" value ={Promo_Code || ""} name="Promo_Code"id="offer_input"onChange={addData}></input>
            </div>
            <div>
                <label htmlFor="product_input">Product</label>
                <input type="text" placeholder="Product" value ={Product || ""} name="Product" id="product_input"onChange={addData}></input>
            </div>
            <div>
                <label htmlFor="desc_input">Description</label>
                <input type="text" placeholder="Describe the Product" value ={Description || ""} name="Description" id="desc_input"onChange={addData}></input>
            </div>
            <div>
                <label htmlFor="date_input">Expiry Date</label>
                <input type="text" name="Expiry_Date" value ={Expiry_Date || ""} id="date_input"onChange={addData}></input>
            </div>
            <input type="submit" value={id ? "Update":"Save"}/>
            <Link to="/">
                <input type="button" value="Return"/>
            </Link>
        </div>
        </form>
    </div>
  )
}
