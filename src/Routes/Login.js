const express = require("express");
const router = express.Router();
const { checkUserPassword, isUserInDB } = require("../Helpers/LoginFunctions");

router.post("/", (req, res) => {
  const { userName, password } = req.body;

  isUserInDB(userName).then(({ result }) => {
    if (result === true) {
      checkUserPassword(userName, password)
        .then(() => {
          res
            .status(200)
            .send({ success: true, message: `Nice to see you ${userName}!` });
        })
        .catch((error) => {
          res.send({ success: false, errMessage: "Server error" });
          console.log(error);
        });
    } else {
      res.send({ success: false, errMessage: "User does not exists" });
    }
  });
});

module.exports = router;
