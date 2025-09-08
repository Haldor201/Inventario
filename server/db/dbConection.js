import mongoose from 'mongoose';

// MongoDB connection URI mongodb://192.168.18.32:27017/admin
const uri = "mongodb://192.168.18.32:27017/admin";

// Connect to the database
async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection error:", error);
  }
}


connectToDatabase();