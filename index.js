const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2")
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"MySQLpwd14$",
    database:"offer_db",
})


app.get("/api/get",(req,res)=>{
    const sqlGet = "SELECT * FROM offer_table";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    })
})


app.post("/api/post",(req,res) =>{
    const {Promo_Code,Product,Description,Expiry_Date} = req.body;
    const sqlInsert = "INSERT INTO offer_table (Promo_Code,Product,Description,Expiry_Date) VALUES(?,?,?,?)";
    db.query(sqlInsert,[Promo_Code,Product,Description,Expiry_Date],(error,result) =>{

        if (error){
            console.log("Error!!")
        }
    })
})

app.delete("/api/delete/:id",(req,res) =>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM offer_table WHERE id = ?";
    db.query(sqlRemove,id,(error,result) =>{

        if (error){
            console.log("Error!!")
        }
    })
})


app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT * FROM offer_table WHERE id = ?";
    db.query(sqlGet,id,(error,result) => {
        res.send(result);
    })
})


app.put("/api/update/:id",(req,res)=>{
    const {id} = req.params;
    const {Promo_Code,Product,Description,Expiry_Date} = req.body;
    const sqlUpdate = "UPDATE offer_table SET Promo_Code = ?,Product = ?,Description = ?,Expiry_Date = ? WHERE id = ?";
    db.query(sqlUpdate,[Promo_Code,Product,Description,Expiry_Date,id],(error,result) => {
        if(error){
            console.log(error)
        }
        res.send(result);
    })
})

app.get("/",(req,res) =>{
    // const sqlInsert = "INSERT INTO offer_table(Promo_Code,Product,Description,Expiry_Date) VALUES ('john12','Minimalist','Facewash','2023-05-12')";
    // db.query(sqlInsert,(error,result)=>{
    //     console.log("Error",error);
    //     console.log("Success",result);
         res.send("Hello Express!!")
    //  })
})
app.listen(5000, () => {
    console.log("Hooray! Server is running!!!")
})