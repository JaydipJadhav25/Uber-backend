import  dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from  "cors"
import { dbconnect } from "./db/dbConnection.js";
import userRoutes from "./routes/user.routes.js"



const app = express();
dbconnect();

app.use(cors());//acpet req anywherer
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get("/" , (req , res) =>{
    return res.send("hello world");
})
app.use("/user" , userRoutes)







export { app}