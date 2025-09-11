import mongoose from 'mongoose';

// MongoDB connection URI mongodb://192.168.18.32:27017/inventario
//This is fun
const uri = "mongodb://localhost:27017/Inventario";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB and 'inventario' database!");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);
  }
};

export default connectDB;