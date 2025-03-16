const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// טעינת הראוטרים
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// התחברות למסד נתונים
const dbURI =
  process.env.MONGO_URI;

const connectToDb = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("✅ Connected to MongoDB");
    app.listen(3002, () => console.log("🚀 Server running on port 3002"));
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};

console.log("process.end: ", process.env);
console.log("MONGO_URI: ", process.env.MONGO_URI);
console.log("SENDGRID_API_KEY: ", process.env.SENDGRID_API_KEY);
console.log("AWS_ACCESS_KEY: ", process.env.AWS_ACCESS_KEY);

connectToDb();
