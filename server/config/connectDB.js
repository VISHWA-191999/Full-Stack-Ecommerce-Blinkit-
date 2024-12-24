import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

// console.log(process.env.MONGODB_URI)
if(!(process.env.MONGODB_URI)) {
    throw new Error('Mongo DB URI is not present in the .env file')
}

async function connectDB() {

    try {
        // console.log(process.env)
     await mongoose.connect(process.env.MONGODB_URI)
    
     
        console.log("Connected to DB")
      
    } catch (error) {
        console.error("Failed to connect DB",error)
        process.exit(1) // it will stop the server
    }
}

export default connectDB