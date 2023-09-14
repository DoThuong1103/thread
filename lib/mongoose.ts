import mongoose from "mongoose";

let isConnection = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
  if (isConnection) return console.log("Alrealy connected to MongoDB");
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnection = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};
