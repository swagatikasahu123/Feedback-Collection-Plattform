const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const responseRoutes = require("./routes/responseRoutes");

dotenv.config();
const app = express();

// ✅ Allow only specific frontend domains
const allowedOrigins = [
  "http://localhost:3000", // local frontend
  "https://feedback-collection-plattform-m4fu.vercel.app" // deployed Vercel frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"))
  )
  .catch(err => console.log("❌ DB Connection Failed:", err));
