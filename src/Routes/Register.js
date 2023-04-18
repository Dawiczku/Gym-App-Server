const express = require("express");
const router = express.Router();
const { isUserInDB, addUserToDB } = require("../Helpers/RegisterFunctions");

router.post("/", (req, res) => {
  const { userName, password, email } = req.body;

  isUserInDB(userName, email)
    .then(({ isDataTaken, dataMessage }) => {
      if (isDataTaken) {
        res.send({ success: false, errMessage: dataMessage });
      } else {
        addUserToDB(userName, password, email)
          .then(() => {
            res.send({ success: true, message: dataMessage });
          })
          .catch((error) => {
            console.log(error);
            res.send({ success: false, errMessage: "Something went wrong." });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.send({ success: false, errMessage: "Server error." });
    });
});

module.exports = router;
