import{ Server } from "socket.io";
import { userModel } from "./models/user.models.js";
import { captionModel } from "./models/caption.model.js";

let io ;  

function intiailizationSocket(server){
    io = new Server(server , {
        cors :{
            origin : "http://localhost:5173",
            methods : ["GET" , "POST"]
        }
    });

    io.on('connection' , (socket)=>{
        console.log("client connected " , socket.id);


        io.emit("hello" , "world");



        socket.on("message"  , (msg)=>{
            console.log("client message : " , msg);
        })

        //handle events update socket id 
        socket.on('join' , async(data)=>{
            console.log("join event : " , data);
            const {userType , userId} = data;


            if(userType === "user"){

         const updateuser = await userModel.findByIdAndUpdate(userId , {socketID  : socket.id})
         console.log("updated user : " , updateuser)

            }else if(userType === "caption"){
            const updatecaption =    await captionModel.findByIdAndUpdate(userId , {socketID  : socket.id})
         console.log("updated caption: " , updatecaption);

            }
        });
        

        socket.on("update-loaction-caption" , async({userId , location})=>{

             //nanter loaction update  kraych caption ch 10sec nanter..
             
        })



         
       






        socket.on("disconnect" , ()=>{
            console.log("client disconnected :" , socket.id)
        })





    })


}

function sendMessageToSocketId(socketId , message){
    if(io){
        io.to(socketId).emit("new-ride" , message);
    }else{
        console.log("connection in not create.............");
    }
}


export { intiailizationSocket , sendMessageToSocketId}