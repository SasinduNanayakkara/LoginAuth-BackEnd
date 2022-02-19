const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const userDetails = require("./routes/userDetails");

const app = express();

require("dotenv").config();

//middlewares
app.use(express.json());
app.use(cors());

//database connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("DB Connection successful")
).catch((err) => {
    console.log(err);
});

app.get("/", (req,res) => {
    res.send("success");
    console.log(process.env.PORT);
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", userDetails);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`BackEnd server up and Running on ${PORT}...`));