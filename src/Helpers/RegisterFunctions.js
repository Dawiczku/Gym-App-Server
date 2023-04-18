const { execute, mysqlPool } = require("../Config/DataBase");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const isUserInDB = async (userName, email) => {
  const checkUserNameQuery = "SELECT * FROM user WHERE userName=(?)";
  const checkEmailQuery = "SELECT * FROM user WHERE userEmail=(?)";

  try {
    const [userNameRows] = await execute(checkUserNameQuery, [userName]);
    const [emailRows] = await execute(checkEmailQuery, [email]);

    if (userNameRows.length === 0 && emailRows.length === 0) {
      return { isDataTaken: false, dataMessage: "Account created!" };
    } else {
      if (userNameRows.length > 0) {
        return { isDataTaken: true, dataMessage: "Username already exists" };
      } else if (emailRows.length > 0) {
        return { isDataTaken: true, dataMessage: "Email already exists" };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const addUserToDB = async (userName, password, email) => {
  try {
    const connection = await mysqlPool.getConnection();
    const hashedPassword = await bcrypt.hash(password, 12);

    connection.query(
      "INSERT INTO user(userName, userPassword, userEmail, userID) VALUES(?, ?, ?, ?)",
      [userName, hashedPassword, email, uuidv4()]
    );
    connection.release();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isUserInDB, addUserToDB };
