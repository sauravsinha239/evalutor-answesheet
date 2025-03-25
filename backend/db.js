import mongoose from "mongoose";

export const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database sucessfully  connected");
        console.log(`MongoDb connected : ${conn.Connection.host}`);
    }
    catch (error) {
        console.error(`error: ${error.message}`);

    }
}