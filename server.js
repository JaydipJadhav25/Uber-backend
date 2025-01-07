import { app } from "./app.js";
import  http  from "http"
import { intiailizationSocket } from "./socket.js";


const port = process.env.PORT || 3000;


const server = http.createServer(app);


intiailizationSocket(server);

// case 1  :
server.listen(port , () =>{
    console.log(`server is starting on PORT ${port}`)
})



// case 2 : 
// app.listen(port , () =>{
//      console.log(`server is starting on PORT ${port}`)

// })