import { app } from "./app.js";
import  http  from "http"



const port = process.env.PORT || 3000;


const server = http.createServer(app);

// case 1  :
server.listen(port , () =>{
    console.log(`server is starting on PORT ${port}`)
})



// case 2 : 
// app.listen(port , () =>{
//      console.log(`server is starting on PORT ${port}`)

// })