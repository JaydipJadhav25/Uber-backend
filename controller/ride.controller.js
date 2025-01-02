import { createRide } from "../services/ride.service.js";




const createride = async(req, res) =>{

    //access current user
    const user = req.user._id;
    console.log("user  " , user);
 
    //data
    const {pickup , destination , vehicletype} = req.body;

    try {

        const ride = await createRide(user , pickup , destination , vehicletype);
          console.log("ride create : " ,ride)
        if(!ride) {
            return res.status(500).json({
            message : "create ride error not create",

            })
        }
        
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




export { createride}