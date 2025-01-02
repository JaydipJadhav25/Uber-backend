import { captionModel } from "../models/caption.model.js";
import { createcaption, emailcheck } from "../services/caption.service.js"
import { validationResult} from "express-validator"
import { findCaption } from "../services/caption.service.js";
import { blacklistToken } from "../models/blacklisttoken.model.js";


const captionsignup = async (req, res) => {

    //check body
    const bodyError = validationResult(req);
    if(!bodyError.isEmpty()){
        return res.status(401).json({errors : bodyError.array()});
    }

    const { fullname , email , password , vehicle} = req.body;

    //check email 
    const existingUser = await emailcheck(email);
    if(!existingUser){
        return res
        .status(401)
        .json({
            message : "email is allready exites"
        })
    }
    //hash password
    const hashpassword = await captionModel.hashpassword(password);

    //create
    const caption = await createcaption(fullname , email , hashpassword , vehicle);

    //
    if(!caption){
        return res
        .status(401)
        .json({
            message : "caption create error , try agin"
        })
    }

    return res
    .status(200)
    .json({
        message  :" caption create successfully........",
        caption
    })


}

const captionlogin = async (req , res) => {

    //check body
    const bodyError = validationResult(req);
    if(!bodyError.isEmpty()){
        return res.status(401).json({errors : bodyError.array()});
    }

    const { email , password} = req.body;

    console.log("data : " , email , password);

    //check user is exiting or not 
    const caption = await findCaption(email);
     
    if(!caption){
        return res.status(401).json({
            message : "caption is not found"
        })
    }

    //compare password
    const comparePassword = await caption.checkpassword(password);

    if(!comparePassword){
        return res.status(401).json({
            message : "password is not matching"
        })
    }

    //gen token
    const token = await caption.authtoken();
    console.log("token " , token);

    return res
    .cookie("token" , token)
    .status(200)
    .json({
      message : " caption login successfull", 
      token 
    })

}


const captionProfile = async(req, res) =>{
    //caption is present in req

    return res
    .status(201)
    .json(req.caption);
}

const captionlogout = async(req, res) =>{
    //get token add blacklist and clear cookie

    const token = req.cookies.token || req.headers?.split('')[1];
     //addd
    await blacklistToken.create({token});
     //clear

     return res.clearCookie("token").status(200).json({
        message : "caption logout sucessfully........ "
     })
                            
    }





export{
    captionsignup,
    captionlogin,
    captionProfile,
    captionlogout
}