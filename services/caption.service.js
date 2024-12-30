import { captionModel } from "../models/caption.model.js";





//carete caption 

const createcaption = async (fullname , email , password , vehicle) =>{
    // color , plate , capacity , vehicaltype ,

    //check
    if(!fullname || !email || !password || !vehicle){
        throw new Error("all files requried");
    }





    const caption = await captionModel.create({
   fullname :{
    firstname : fullname.firstname,
    lastname : fullname.lastname
   },
   email,
   password ,
   vehicle :{
    color : vehicle.color,
    plate : vehicle.plate,
    capacity : vehicle.capacity,
    vehicaltype : vehicle.vehicaltype
   }
    })

    return caption;
}

const emailcheck = async(email) =>{
    try {
        
        const existingemail = await captionModel.findOne({email});
        if(existingemail){
            return false
        }else{
            return true
        }


    } catch (error) {
        console.log(error);
        return new Error("email check error");
        
    }
}

const findCaption = async(email) =>{
    try {
        
        const existingemail = await captionModel.findOne({email}).select('+password');
      
        return existingemail;


    } catch (error) {
        console.log(error);
        return new Error("email caption  error");
        
    }
}

export { createcaption , emailcheck , findCaption}