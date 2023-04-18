require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const register = require("./src/Routes/Register");
const login = require("./src/Routes/Login");

app.use(express.json());

app.use(cors());

app.use("/register", register);
app.use("/login", login);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
