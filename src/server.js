import express from "express";
import pg from "pg";

const db= new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"FosterAI",
    password:"12345",
    port:5432,
});

const app=express();
const port=3000;

app.use(express.json());
db.connect();

let messages=[];

db.query("SELECT * FROM messages",(err,res)=>{
    if(err){
        console.error("Error executing query",err.stack);
    }else{
        messages=res.rows;
        // console.log(messages);
        
    }
    db.end();
});

app.get("/api/messages",(req,res)=>{
    res.json(messages);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });