import { validationResult} from "express-validator"
import { userModel } from "../models/user.models.js";
import { checkemail, createuser } from "../services/user.service.js";



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


export {
    userSignup
}