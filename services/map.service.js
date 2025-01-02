
import puneSataraData from "../dummydata.json" assert { type: "json" };



const addresscoordinates = async (address) => {
    // Dummy data to simulate the response from Google Maps API
    const dummyData = [
        { lat: 40.712776, lng: -74.005974 },
        { lat: 34.052235, lng: -118.243683 },
        { lat: 51.507351, lng: -0.127758 },
        { lat: 48.856613, lng: 2.352222 },
        { lat: 35.689487, lng: 139.691711 },
        { lat: -33.868820, lng: 151.209290 }
    ];

    // Simulate different coordinates for different addresses
    const index = address.length % dummyData.length;
    return [dummyData[index]];
};

const distancetime = async (origin, destination) => { 
   
    // Dummy data to simulate the response from Google Maps API
    const dummyData = [
        { distance: { text: '13.5 km', value: 13500 }, time: { text: '30 mins', value: 1800 } },
        { distance: { text: '15.7 km', value: 15700 }, time: { text: '35 mins', value: 2100 } },
        { distance: { text: '10.2 km', value: 10200 }, time: { text: '25 mins', value: 1500 } },
        { distance: { text: '20.1 km', value: 20100 }, time: { text: '40 mins', value: 2400 } },
        { distance: { text: '12.5 km', value: 12500 }, time: { text: '28 mins', value: 1680 } },
        { distance: { text: '18.3 km', value: 18300 }, time: { text: '38 mins', value: 2280 } }
    ];

    // Simulate different distance and time for different origin and destination
     const index = (origin.length + destination.length) % dummyData.length;
    console.log(dummyData[index]);
    return dummyData[index];
    // return dummyData[0];
}

const calculateFare = async (origin, destination) => {
    const { distance, time } = await distanceTime(origin, destination);

    // Dummy fare calculation based on distance and time
    const baseFare = 5; // Base fare in dollars
    const costPerKm = 2; // Cost per kilometer in dollars
    const costPerMinute = 0.5; // Cost per minute in dollars

    const distanceValue = parseFloat(distance.split(' ')[0]);
    const timeValue = parseFloat(time.split(' ')[0]);

    const fare = baseFare + (distanceValue * costPerKm) + (timeValue * costPerMinute);
    return { fare: `$${fare.toFixed(2)}` };
};


const autoSuggest = async (address) => {
    // Dummy data to simulate the response from Google Maps API
    const dummyData = [
        'New York, NY, USA',
        'Los Angeles, CA, USA',
        'London, UK',
        'Paris, France',
        'Tokyo, Japan',
        'Sydney, Australia'
    ];


    // dummyData.push(...puneSataraData);


    // Filter auto-suggestions based on the input address
    const suggestions = puneSataraData.filter((place) =>
        place.toLowerCase().includes(address.toLowerCase())
    );
    return suggestions;
}    

export { addresscoordinates, distancetime , autoSuggest };
