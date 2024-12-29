import mongoose  from "mongoose";


const dbconnect = async() =>{

    try {
    const connection = await mongoose.connect(process.env.DB);
        console.log("Database connected successfully , ");
    } catch (error) {
        console.log("Database connected failed , " , error);
        process.exit(0);
       
        
    }
}

export { dbconnect }