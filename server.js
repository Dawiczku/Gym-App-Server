require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const register = require("./src/Routes/Register");

app.use(express.json());

app.use(cors());

app.use("/register", register);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
