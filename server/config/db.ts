import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `MongoDB connected on DB HOST::::::::::::::: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection failed::::::::::: ${error}`);
    process.exit(1);
  }
};
