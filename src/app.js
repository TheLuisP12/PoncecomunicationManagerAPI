const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const templateRoutes = require("./routes/templateRoutes");
const messageRoutes = require("./routes/messageRoutes");
const flowHistorialRoutes = require("./routes/flowHistorialRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/flow-historials", flowHistorialRoutes);
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
