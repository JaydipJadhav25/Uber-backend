import { validationResult} from "express-validator"
import { userModel } from "../models/user.models.js";
import { checkemail, createuser, existemail } from "../services/user.service.js";



const userSignup = async(req ,res) =>{

    //check perform validation on body
    const error =  validationResult(req); //pass req then check body
    if(!error.isEmpty()){
        return res.json({errors : error.array()});
    }

    //get data
    const { fullname , email , password} = req.body;
    console.log("data : " , fullname , email , password);

    const useremail = await checkemail(email);
    if(!useremail){
        return res.status(400).json({
            messgae  : "Eamil is allready taken ... try agin"
        })
    }

    //hash password 
    const hashpassword = await userModel.hashpassword(password);

    //create user
    const user = await createuser(fullname , email , hashpassword);

    
    //gen token 

    const token  = await user.authtoken();
    //response

    return res.json({
        token , 
        user
    })

}


const userlogin = async( req , res) =>{
      //check perform validation on body
      const error = validationResult(req);
      if(!error.isEmpty()){
        return res.json({errors : error.array()});
    }

    const { email , password} = req.body;

    //check user is exiting or not 
    const existUser = await existemail(email);

    if(!existUser) {
        return res.status(401).json({
            message : "user is not existing.......Invalide email"
        })
    }

    //check password
    const isPassword = await existUser.chechuserpassword(password);

    if(!isPassword) return res.status(400).json({error : "password is wrong "});

    //genrate token 

    const token = await existUser.authtoken();

    return res.
    status(200)
    .cookie("token" , token )
    .json({
        message : "login successfull",
    });
   


      
        
                
         
}

export {
    userSignup,
    userlogin
}