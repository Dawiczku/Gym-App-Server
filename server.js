require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = process.env.PORT || 3500;
const { v4: uuidv4 } = require("uuid");

app.use(express.json());

app.use(cors());

const mysqlConnection = mysql.createConnection({
  user: process.env.DATABASE_USER,
  host: process.env.HOST,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

app.post("/register", (req, res) => {
  const { userName, password, email } = req.body;
  const checkUserQuery =
    "SELECT EXISTS(SELECT 1 FROM user WHERE userName=(?) OR userEmail=(?))";
  const addUserQuery =
    "INSERT INTO user(userName, userPassword, userEmail, userID) VALUES(?, ?, ?, ?)";
  let isUserInDB;

  mysqlConnection.query(checkUserQuery, [userName, email], (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    isUserInDB = Object.values(result[0])[0];

    if (isUserInDB === 0) {
      mysqlConnection.query(
        addUserQuery,
        [userName, password, email, uuidv4()],
        (error, result) => {
          if (error) {
            console.error(error);
            return;
          } else {
            if (result) {
              res.send(result);
            } else {
              res.send({ errMessage: "Something went wrong." });
              return;
            }
          }
        }
      );
    } else {
      console.log("User in DB");
      return;
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
