import { validationResult} from "express-validator"
import { userModel } from "../models/user.models.js";
import { checkemail, createuser, existemail } from "../services/user.service.js";
import { blacklistToken } from "../models/blacklisttoken.model.js";
import jwt from "jsonwebtoken"



const userSignup = async(req ,res) =>{

    //check perform validation on body
    console.log(" req body : " , req.body);

    const error =  validationResult(req); //pass req then check body
    console.log("error : " , error);
    if(!error.isEmpty()){
        return res
        .status(400)
        .json({message : error.array()});
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
        message : "user create successfully",
        
    })
    .status(200)

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

    return res
    .cookie("token" , token)
    .status(200)
    .json({
        message : "login successfull",
        token,
        existUser
    });
   


      
        
                
         
}

const userProfile = async(req ,res) =>{

    return res.status(200).json(
        req.user
    )
}

const userlogout = async(req , res) =>{

//add token in blacklist
     const token  = req.cookies.token || req.headers.authorization?.split(" ")[1];
        await blacklistToken.create({token});

    return res.clearCookie("token").status(200).json({
        message : "logout successfull"  
    })

}


const getUserbyId = async(req , res)=>{
    const token  = req.query.token ;

    //decode token 
      try {
        const user = jwt.verify(token, process.env.JWT_SCERET);
    
        return res.json(user).status(200);
      } catch (error) {
     
        return res.json({
            message : error,
        })
        
      }




}


export {
    userSignup,
    userlogin,
    userProfile,
    userlogout,
    getUserbyId
}