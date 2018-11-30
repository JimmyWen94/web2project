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
// unnecessary user put
router.patch("/:id", async (req, res) => {
  const updatedData = req.body;
  try {
    await userData.getUserById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "User not Found"});
  }

  if (!updatedData) {
    res.status(400).json({ error: "You must provide data to update a User!" });
    return;
  }

  if (updatedData.pw) {
    if (typeof updatedData.pw !== "string") {
      res.status(400).json({ error: "You must provide a legal pw!" });
      return;
    }
  }
  if (updatedData.intro) {
    if (typeof updatedData.intro !== "string") {
      res.status(400).json({ error: "You must provide a legal intro!" });
      return;
    }
  }
  // more error check require 
  // if (updatedData.description) {
  //   if (typeof updatedData.description !== "string") {
  //     res.status(400).json({ error: "You must provide legal description" });
  //     return;
  //   }
  // }

  try {
    const updatedUser = await userData.updateUser(req.params.id, updatedData);
    res.json(updatedUser);
  } catch (e) {
    res.status(400).json({error: "Update Error"});
  }

}); //patch end

router.post("/:id/enroll_ev", async (req, res) => {
  const updatedData = req.body;
  if (!updatedData) {
    res.status(400).json({ error: "You must provide details for enrolled events!" });
    return;
  }

  if (!updatedData.eventId) {
    res.status(400).json({ error: "You must provide a legal eventID!" });
    return;
  }

  if (!updatedData.title || typeof updatedData.title !== "string") {
    res.status(400).json({ error: "You must provide legal title" });
    return;
  }

  if (!updatedData.date || typeof updatedData.date !== "string") {
    res.status(400).json({ error: "You must provide legal date" });
    return;
  }

  if (!updatedData.time || typeof updatedData.time !== "string") {
    res.status(400).json({ error: "You must provide legal time" });
    return;
  }

  try {
    await userData.getUserById(req.params.id);
  } catch (e) {
    res.status(404).json({error: "User not found"});
  }
  
  try {
    //console.log(updatedData);
    const updatedUser = await userData.addUserEnroll(req.params.id, updatedData);
    res.json(updatedUser);
  } catch (e) {
    res.status(400).json({error: "User Enrolled Event Adding Error"});
  }
}); //addUserEnroll end

router.delete("/:userId/:eventId", async (req, res) => {
  try {
    const temp = await userData.getUserById(req.params.userId);
    
    try {
      const test = temp.enroll_ev.find(ev => ev.eventId === req.params.eventId);
      if (test === undefined) {
        throw error;
      }
      await userData.removeUserEnroll(req.params.userId, req.params.eventId);
      res.send();
    } catch (e) {
      res.status(404).json({ error: "Event not found"});
    }
  } catch (e) {
    res.status(404).json({ error: "User ID not found"});
  }

}); //delete end

module.exports = router;