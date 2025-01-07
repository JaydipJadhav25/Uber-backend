import jwt from "jsonwebtoken"
import { userModel } from "../models/user.models.js"
import { blacklistToken } from "../models/blacklisttoken.model.js";
import { captionModel } from "../models/caption.model.js";

const authUser = async(req, res , next) =>{
    // console.log("call.............................")
    // const token = req.cookies.token ||  req.headers.authorization.split(' ')[1] || null ; 
    ;
    // console.log("token : " , req);
    // const token = req.headers.authorization.split(' ')[1] ;
    const token = req.cookies.token || req.headers?.authorization?.split(' ')[1];

    console.log("token in header : " , token);

    
    if(!token) {
        return res.json({
            message : "Unauthorized"
        })
    }

    //check token is blacklisted or not
    const isBlacklisted = await blacklistToken.findOne({token});

    if(isBlacklisted) {
        return res.json({
            message : "Token is blacklisted"
        })
    }



    try {
        
        const decodetoken = jwt.verify(token , process.env.JWT_SCERET);
        
        const user = await userModel.findById(decodetoken._id);
        if(!user) {
            return res.json({
                message : "Unauthorize user i not found"
            })
        }

        //set user

        req.user = user;
        next();


    } catch (error) {
        console.log("error : " , error);

        return res.json({ 
            message : "Authuser error Unauthorize"
        })
        .status(401)
        
    }finally{

    console.log("call.............................")


    }
}

const authCaption = async(req ,res , next) =>{

    // const token = req.cookies?.token || req.headers?.split('')[1];
    const token = req.cookies.token;

   try {
     if(!token){
         return res.json({
             message : "Unauthorized Rquest"
         })
     }
     //check blacklist token
    const isblacklisttoken = await blacklistToken.findOne({token});

    if(isblacklisttoken){
        return res.json({
            message : "Unauthorized Rquest Token is add in blacklist"
        })
    }




     //decode token
     const decodetoken =  jwt.verify(token ,process.env.JWT_SCERET );
 
     const caption = await captionModel.findById({_id : decodetoken._id});
 
     if(!caption){
         return res.json({
             message : "Unauthorized Rquest"
         })
     }
 
     //set
     req.caption = caption;
 
     next();

   } catch (error) {
    console.log(error)
    return res.json({
        message : "Unauthorized Rquest"
    })

    
   }


}


export { authUser , authCaption}