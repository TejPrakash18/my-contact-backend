const express = require("express");
const connectDB = require("./config/dbConnection");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.use(express.json());

app.use("/api/users",require("./routes/userRoutes"));

app.listen(PORT, () => {
    console.log(`Server is running at this port ${PORT}`);
});
