const { execute } = require("../Config/DataBase");
const bcrypt = require("bcrypt");

const isUserInDB = async (userName) => {
  const getUser = "SELECT userPassword FROM user WHERE userName=(?)";

  try {
    const [userRows] = await execute(getUser, [userName]);

    if (userRows.length === 0) {
      return { result: false };
    } else {
      return { result: true };
    }
  } catch (error) {
    console.log(error);
  }
};

const checkUserPassword = async (userName, password) => {
  const getUserPassword = "SELECT userPassword FROM user WHERE userName=(?)";
  try {
    const userPassword = await execute(getUserPassword, [userName]);
    return bcrypt.compare(userPassword.toString(), password.toString());
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  isUserInDB,
  checkUserPassword,
};
