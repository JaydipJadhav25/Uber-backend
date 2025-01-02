import  dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from  "cors"
import { dbconnect } from "./db/dbConnection.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import captionRouters from "./routes/caption.routes.js";
import mapRouters from "./routes/map.routes.js"
import { authUser } from "./middleware/auth.middleware.js";
import rideRouter from "./routes/ride.routes.js"

const app = express();
dbconnect();

// app.use(cors({ 
//     origin : 'http://localhost:5173',
//     credentials : true}));//acpet req anywherer

// app.use(cors({
//     credentials : true ,
 
// }));

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


app.get("/" , (req , res) =>{
    return res.send("hello world");
})


app.use("/user" , userRoutes);
app.use("/caption" , captionRouters);
app.use("/map" , mapRouters);
app.use("/ride" , authUser , rideRouter);







export { app}