const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuidv4 = require("uuid/v4");

const exportedMethods = {
    //!!!!!!  for get, pw issues !!!!!!
    //
    async getAllUsers() {
        const userCollection = await users();
        return await userCollection.find({}).toArray();
    },

    async getUserById(id) {
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: id });

        if (!user) { 
            throw "ID Not Exist";
        }
        return user
    },    

    async addUser(pw, fName, LName, photo, 
        intro, safe_mode) {
        //!!!! Missing Error Checking !!!!

        //console.log("add start");
        // if (typeof title !== "string") throw "No title provided";

        // if (typeof description !== "string") throw "No description provided";

        //console.log("para check");
        const userCollection = await users();
        
        const newEvArray = [];
        const newFriArray = [];

        const newUser = {
            _id: uuidv4(),
            pw: pw,
            fName: fName,
            LName: LName,
            photo: photo,
            intro: intro,
            enrolled_ev: newEvArray,
            friends: newFriArray,
            safe_mode: safe_mode
        };

        const newInsert = await userCollection.insertOne(newUser);
        const newId = newInsert.insertedId;
        return await this.getUserById(newId);
    }

};

module.exports = exportedMethods;