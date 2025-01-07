import { riderModel } from "../models/ride.model.js";
import { addresscoordinates } from "./map.service.js";

const calculateDistance = async(pickup, destination) => {
    // Dummy implementation for distance calculation
    // In real scenario, you would use a service like Google Maps API
    const pickdata = await addresscoordinates(pickup);
    const destinationdata = await addresscoordinates(destination);

    console.log("data of address : " , pickdata[0], destinationdata[0]);

    return Math.sqrt(
        Math.pow(destinationdata[0].lat - pickdata[0].lat, 2) +
        Math.pow(destinationdata[0].lng - pickdata[0].lng, 2)
    );
};

const calculateFare = async(pickup, destination) => {
    const rates = {
        auto: 10, // rate per km for auto
        car: 15, // rate per km for car
        bike: 5 // rate per km for bike
    };
console.log("pickup : " , pickup , destination);

    const distance = await calculateDistance(pickup, destination);

   
        const carfaer = Math.round(rates.car * distance)
        const autofaer = Math.round(rates.auto * distance)
        const bikefaer = Math.round(rates.bike * distance)

    return {
        auto: autofaer,
        car: carfaer,
        bike: bikefaer
    };
};



//genrate otp

const genOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};



const createRide = async(user , pickup , destination , vehicletype) =>{

    if(!user || !pickup || !destination || !vehicletype){
        throw new Error("All feild required.")
    }

    console.log("user : " , user , destination , vehicletype);


    //find lat , lng of pickup and destination

    // const pickdata = await addresscoordinates(pickup);
    // const destinationdata = await addresscoordinates(destination);

    // console.log("data of address : " , pickdata[0], destinationdata[0]);



    //calculate fare
    const fareresult = await calculateFare(pickup,  destination);

    

    const otp =  genOtp();
    
    //careate ride doc
    const ride = await riderModel.create({
        user,
        pickup,
        destination,
        fare : fareresult[vehicletype],
        otp 
    }); 

    return ride;
}



export { createRide , calculateFare , calculateDistance };