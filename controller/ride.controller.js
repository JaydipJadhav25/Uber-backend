
import { riderModel } from "../models/ride.model.js";
import { getCaptionInRadius } from "../services/map.service.js";
import { createRide  ,  calculateFare} from "../services/ride.service.js";
import { sendMessageToSocketId } from "../socket.js";



const createride = async(req, res) =>{

    //access current user
    const user = req.user._id;
    console.log("user  " , user);
 
    //data
    const {pickup , destination , vehicletype} = req.body;

    console.log("pickup : " , pickup , destination , vehicletype);

    try {

        const ride = await createRide(user , pickup , destination , vehicletype);
          console.log("ride create : " ,ride);

        if(!ride) {
            return res.status(500).json({
            message : "create ride error not create",

            })
        }
        
        //after careate ride
        // finde caption in radius
        const captionInRadius  = await getCaptionInRadius(30);
        console.log("caption radius  : " , captionInRadius);


        // otp clear
        ride.otp = "";


      //send notification to all captions for ride
        // Promise.all

        const userride = await riderModel.findOne({_id : ride._id}).populate("user");

      await sendMessageToSocketId(captionInRadius.socketID , userride);






        return res .status(200).json(ride);
        
    } catch (error) {
        console.log(error);

        return res.status(500)
        .json({
            message : "create ride error ",
            error
        })
        
    }


}

const getFare = async(req, res) =>{
    // const { pickup , destination} = req.body;
    const { pickup , destination} = req.query;//data comes into params
   

     console.log("pickup : " , pickup , destination);

    try {

const fare = await calculateFare(pickup , destination);
console.log("fare in controller: " , fare);


if(!fare){
    return res.status(500)
    .json({
        message : "get fare error ",
        error
    })
}

return res.status(200).json(fare);
        

    } catch (error) {
        console.log(error);

        return res.status(500)
        .json({
            message : "get fare error ",
            error
        })
    }
}



export { createride , getFare}