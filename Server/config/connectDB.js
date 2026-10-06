const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, { family: 4 });
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Error: ", error?.message);
  }
};

module.exports = connectDB;
