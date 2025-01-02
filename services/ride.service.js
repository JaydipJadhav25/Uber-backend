import { riderModel } from "../models/ride.model.js";
import { addresscoordinates } from "./map.service.js";

const calculateDistance = (pickup, destination) => {
    // Dummy implementation for distance calculation
    // In real scenario, you would use a service like Google Maps API
    return Math.sqrt(
        Math.pow(destination.lat - pickup.lat, 2) +
        Math.pow(destination.lng - pickup.lng, 2)
    );
};

const calculateFare = (vehicletype, pickup, destination) => {
    const rates = {
        auto: 10, // rate per km for auto
        car: 15, // rate per km for car
        bike: 5 // rate per km for bike
    };

    if (!rates[vehicletype]) {
        throw new Error("Invalid vehicle type");
    }

    const distance = calculateDistance(pickup, destination);

    return rates[vehicletype] * distance;
};



//genrate otp

const genOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};



const createRide = async(user , pickup , destination , vehicletype) =>{

    if(!user || !pickup || !destination || !vehicletype){
        throw new Error("All feild required.")
    }


    //find lat , lng of pickup and destination

    const pickdata = await addresscoordinates(pickup);
    const destinationdata = await addresscoordinates(destination);

    console.log("data of address : " , pickdata[0], destinationdata[0]);



    //calculate fare
    const fare = calculateFare(vehicletype , pickdata[0],  destinationdata[0]);

    console.log("fare  : " , fare);
    const otp = await genOtp();
    
    //careate ride doc
    const ride = await riderModel.create({
        user,
        pickup,
        destination,
        fare,
        otp 
    }); 

    return ride;
}


export { createRide}