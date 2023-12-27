import mongoose from "mongoose";
import { DB_URI } from "./configs";

const connectToDatabase = async () => {
  try {
    if (DB_URI) {
      await mongoose.connect(DB_URI);
      console.log("Database connected");
    }
  } catch (error) {
    console.error("DB error: ", error);
  }
};

export default connectToDatabase;
