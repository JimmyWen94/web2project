const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
const uuidv4 = require("uuid/v4");

const exportedMethods = {

    async getAllEvents() {
        const eventCollection = await events();
        return await eventCollection.find({}).toArray();
    },

    async getEventById(id) {
        const eventCollection = await events();
        const event = await eventCollection.findOne({ _id: id });

        if (!event) { 
            throw "ID Not Exist";
        }
        return event 
    },    

    async addEvent(title, type, place, date, time, 
        description, creator, safe) {
        //console.log("add start");
        if (typeof title !== "string") throw "No title provided";

        if (typeof description !== "string") throw "No description provided";

        //console.log("para check");
        const eventCollection = await events();
        
        const newArray = [];
        //console.log(uuidv4());
        const newEvent = {
            _id: uuidv4(),
            title: title,
            type: type,
            place: place,
            date: date,
            time: time,
            description: description,
            creator: creator,
            enroll: newArray,
            safe: safe
        };

        const newInsert = await eventCollection.insertOne(newEvent);
        //??
        const newId = newInsert.insertedId;
        
        return await this.getEventById(newId);
    },

    async updateEvent(id, updatedEvent) {
        const eventCollection = await events();
        let updatedEventData = {};
        if (updatedEvent.title) {
            updatedEventData.title = updatedEvent.title;
        }
        if (updatedEvent.type) {
            updatedEventData.type = updatedEvent.type;
        }
        if (updatedEvent.place) {
            updatedEventData.place = updatedEvent.place;
        }
        if (updatedEvent.date) {
            updatedEventData.date = updatedEvent.date;
        }
        if (updatedEvent.time) {
            updatedEventData.time = updatedEvent.time;
        }
        if (updatedEvent.description) {
            updatedEventData.description = updatedEvent.description;
        }
        if (updatedEvent.creator) {
            updatedEventData.creator = updatedEvent.creator;
        }
        if (updatedEvent.safe) {
            updatedEventData.safe = updatedEvent.safe;
        }
 
        // if (updatedEventData.completed !== 'undefined') {
        //     updatedEventData.completed = Boolean(updatedEvent.completed);
        // }

        let updateCommand = {
            $set: updatedEventData
        };
        const query = {
            _id: id
        };
        await eventCollection.updateOne(query, updateCommand);

        return await this.getEventById(id);
    },

    async addEnroll(eventId, userInfo) {
        const eventCollection = await events(); 
        let newUserInfo = {};
        newUserInfo.userId = userInfo.userId;
        newUserInfo.fName = userInfo.fName;
        newUserInfo.LName = userInfo.LName;
        await eventCollection.updateOne({_id: eventId}, {
            $push: {
                enroll: newUserInfo
            }
        });
        return await this.getEventById(eventId);
    },

    async removeEnroll(eventId, userId) {
        const eventCollection = await events(); 
        let updateCommand = await eventCollection.updateOne({_id: eventId}, {
            $pull: {
                enroll: {
                    userId: userId
                }
            }
        });
        return await this.getEventById(eventId);
    }

};

module.exports = exportedMethods;