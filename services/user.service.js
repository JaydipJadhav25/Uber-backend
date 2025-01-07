import { userModel } from "../models/user.models.js";




const createuser = async(
    fullname , email , password 
)=>{
    console.log("function calll,,,,,,,,,,,," , fullname , email , password);

    if(!fullname || !email || !password){
        return new Error("All fileds are requried...")
    }

    
    const user = await userModel.create({
        fullname:{
            firstname : fullname.firstname,
            lastname : fullname.lastname,
        },
        email,
        password
    });



    return user ;
}

const checkemail = async(email) =>{
    if(!email) return new Error("email is requride");

   
    //check 
    const existemail  = await userModel.findOne({email});



    if(existemail) {
        return false
    }
   

        return true

    
}

const existemail = async(email) =>{
    if(!email) return new Error("email is requride");

   
    //check 
    const existemail  = await userModel.findOne({email}).select('+password'); //password lagnare na 

     
    return existemail;



    
}










export { createuser , checkemail , existemail}