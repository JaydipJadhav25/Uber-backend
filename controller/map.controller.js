import { addresscoordinates, autoSuggest, distancetime} from "../services/map.service.js";





const getaddrescorrdinates = async (req, res) => {
    try {

        const address = req.query.address;

        const coordinates = await addresscoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


const getDistanceTime = async (req, res) => {
    try {
        const origin = req.query.origin;
        const destination = req.query.destination;
       console.log(origin , destination);
        const distanceTime =  await distancetime(origin, destination);
       
        res.status(200).json(distanceTime);

    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getAutoSuggestions = async (req, res) => {
    try {
        const address = req.query.address;
        const autoSuggestions = await autoSuggest(address);
        res.status(200).json(autoSuggestions);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export { getaddrescorrdinates, getDistanceTime , getAutoSuggestions };