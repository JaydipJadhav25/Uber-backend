import  dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from  "cors"


const app = express();


app.use(cors());

app.get("/" , (req , res) =>{
    return res.send("hello world");
})








export { app}