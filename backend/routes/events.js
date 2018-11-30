const express = require("express");
const router = express.Router();
const data = require("../data/");
const eventData = data.events;



router.get("/:id", async (req, res) => {
    try {
      const event = await eventData.getEventById(req.params.id);
      res.json(event);
    } catch (e) {
      res.status(404).json({ error: "Event id not found" });
    }
});
  
  //will show first 20 events  +   querystring skip, take. Most 100
router.get("/", async (req, res) => {
    try {
      let showNum = req.query.take || 20;
      const eventList = await eventData.getAllEvents();
      const skipNum = req.query.skip || 0;

      if (isNaN(parseInt(showNum))||isNaN(parseInt(skipNum))) {
        throw "query string error";
      }
      if (parseInt(showNum) > 100) {
        showNum = 100;
      }
      //console.log(showNum + " " + skipNum);
      res.json(eventList.slice(0 + skipNum, parseInt(showNum) + parseInt(skipNum)));
      
    } catch (e) {
      res.status(400).json({ error: "Get Error.Maybe illegal query string." });
    }
});
  
router.post("/", async (req, res) => {
    const eventPostData = req.body;
    try {
      const { title, type, place, date, time, 
        description, creator, safe } = eventPostData;
      const newEvent = await eventData.addEvent(title, type, place, date, time, 
        description, creator, safe);
  
      res.json(newEvent);
    } catch (e) {
      res.status(400).json({ error: "Post Error" });
    }
});

router.put("/:id", async (req, res) => {
    const updatedData = req.body;
    if (!updatedData) {
      res.status(400).json({ error: "You must provide data to update a Event!" });
      return;
    }
  
    if (!updatedData.title || typeof updatedData.title !== "string") {
      res.status(400).json({ error: "You must provide a legal title!" });
      return;
    }
    if (!updatedData.type || typeof updatedData.type !== "string") {
      res.status(400).json({ error: "You must provide a legal type!" });
      return;
    }
    if (!updatedData.place || typeof updatedData.place !== "string") {
      res.status(400).json({ error: "You must provide a legal place!" });
      return;
    }
    //!!!!! more check require
    if (!updatedData.date || typeof updatedData.date !== "string") {
      res.status(400).json({ error: "You must provide a legal date!" });
      return;
    }
    //!!!!! more check require
    if (!updatedData.time || typeof updatedData.time !== "string") {
      res.status(400).json({ error: "You must provide a legal title!" });
      return;
    }

    if (!updatedData.description || typeof updatedData.description !== "string") {
      res.status(400).json({ error: "You must provide legal description" });
      return;
    }
    //!!!!! more check require
    if (!updatedData.creator || typeof updatedData.creator !== "string") {
      res.status(400).json({ error: "You must provide a legal title!" });
      return;
    }
    //!!!!! more check require
    if (!updatedData.safe || typeof updatedData.safe !== "string") {
      res.status(400).json({ error: "You must provide a legal title!" });
      return;
    }

    // if (typeof updatedData.completed !== "boolean") {
    //   res.status(400).json({ error: "You must provide legal complete status" });
    //   return;
    // }

    try {
      await eventData.getEventById(req.params.id);
    } catch (e) {
      res.status(404).json({error: "Event not found"});
    }
    // missing the enroll?
    try {
      const updatedEvent = await eventData.updateEvent(req.params.id, updatedData);
      res.json(updatedEvent);
    } catch (e) {
      res.status(400).json({error: "Update Error"});
    }
}); //put end

router.patch("/:id", async (req, res) => {
    const updatedData = req.body;
    try {
      await eventData.getEventById(req.params.id);
    } catch (e) {
      res.status(404).json({ error: "Event not Found"});
    }

    if (!updatedData) {
      res.status(400).json({ error: "You must provide data to update a Event!" });
      return;
    }
  
    if (updatedData.title) {
      if (typeof updatedData.title !== "string") {
        res.status(400).json({ error: "You must provide a legal title!" });
        return;
      }
    }
    if (updatedData.type) {
      if (typeof updatedData.type !== "string") {
        res.status(400).json({ error: "You must provide a legal title!" });
        return;
      }
    }
    // more error check require 
    if (updatedData.description) {
      if (typeof updatedData.description !== "string") {
        res.status(400).json({ error: "You must provide legal description" });
        return;
      }
    }

    try {
      const updatedEvent = await eventData.updateEvent(req.params.id, updatedData);
      res.json(updatedEvent);
    } catch (e) {
      res.status(400).json({error: "Update Error"});
    }

  }); //patch end

//user enroll post
router.post("/:id/enroll", async (req, res) => {
    const updatedData = req.body;
    if (!updatedData) {
      res.status(400).json({ error: "You must provide details for enrolled user!" });
      return;
    }
  
    if (!updatedData.userId) {
      res.status(400).json({ error: "You must provide a legal userID!" });
      return;
    }
  
    if (!updatedData.fName || typeof updatedData.fName !== "string") {
      res.status(400).json({ error: "You must provide legal first name" });
      return;
    }

    if (!updatedData.LName || typeof updatedData.LName !== "string") {
      res.status(400).json({ error: "You must provide legal last name" });
      return;
    }

    try {
      await eventData.getEventById(req.params.id);
    } catch (e) {
      res.status(404).json({error: "Event not found"});
    }
    
    try {
      //console.log(updatedData);
      const updatedEvent = await eventData.addEnroll(req.params.id, updatedData);
      res.json(updatedEvent);
    } catch (e) {
      res.status(400).json({error: "Enroll User Adding Error"});
    }
  }); //addEnroll end
  
  router.delete("/:eventId/:userId", async (req, res) => {
    try {
      const temp = await eventData.getEventById(req.params.eventId);
      
      try {
        const test = temp.enroll.find(use => use.userId === req.params.userId);
        if (test === undefined) {
          throw error;
        }
        await eventData.removeEnroll(req.params.eventId, req.params.userId);
        res.send();
      } catch (e) {
        res.status(404).json({ error: "User not found"});
      }
    } catch (e) {
      res.status(404).json({ error: "Event ID not found"});
    }

  }); //delete end

  module.exports = router;