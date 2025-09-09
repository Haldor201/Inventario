import mongoose from 'mongoose';

// MongoDB connection URI mongodb://192.168.18.32:27017/admin
//This is fun
const uri = "mongodb://192.168.18.32:27017/inventario";

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