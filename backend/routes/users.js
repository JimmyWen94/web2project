const express = require("express");
const router = express.Router();
const data = require("../data/");
const userData = data.users;

router.get("/:id", async (req, res) => {
    try {
      const user = await userData.getUserById(req.params.id);
      res.json(user);
    } catch (e) {
      res.status(404).json({ error: "User id not found" });
    }
});
  
  //will show first 20 users  +   querystring skip, take. Most 100
router.get("/", async (req, res) => {
    try {
      let showNum = req.query.take || 20;
      const userList = await userData.getAllUsers();
      const skipNum = req.query.skip || 0;

      if (isNaN(parseInt(showNum))||isNaN(parseInt(skipNum))) {
        throw "query string error";
      }
      if (parseInt(showNum) > 100) {
        showNum = 100;
      }
      //console.log(showNum + " " + skipNum);
      res.json(userList.slice(0 + skipNum, parseInt(showNum) + parseInt(skipNum)));
      
    } catch (e) {
      res.status(400).json({ error: "Get Error.Maybe illegal query string." });
    }
});
  
router.post("/", async (req, res) => {
    const userPostData = req.body;
    try {
      const { pw, fName, LName, photo, 
        intro, safe_mode } = userPostData;
      const newUser = await userData.addUser(pw, fName, LName, photo, 
        intro, safe_mode);
  
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ error: "Post Error" });
    }
});

module.exports = router;