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
            enroll_ev: newEvArray,
            friends: newFriArray,
            safe_mode: safe_mode
        };

        const newInsert = await userCollection.insertOne(newUser);
        const newId = newInsert.insertedId;
        return await this.getUserById(newId);
    },

    async updateUser(id, updatedUser) {
        const userCollection = await users();
        let updatedUserData = {};
        if (updatedUser.pw) {
            updatedUserData.pw = updatedUser.pw;
        }
        if (updatedUser.fName) {
            updatedUserData.fName = updatedUser.fName;
        }
        if (updatedUser.LName) {
            updatedUserData.LName = updatedUser.LName;
        }
        if (updatedUser.photo) {
            updatedUserData.photo = updatedUser.photo;
        }
        if (updatedUser.intro) {
            updatedUserData.intro = updatedUser.intro;
        }
        if (updatedUser.safe_mode) {
            updatedUserData.safe_mode = updatedUser.safe_mode;
        }
 
        // if (updatedUserData.completed !== 'undefined') {
        //     updatedUserData.completed = Boolean(updatedUser.completed);
        // }

        let updateCommand = {
            $set: updatedUserData
        };
        const query = {
            _id: id
        };
        await userCollection.updateOne(query, updateCommand);

        return await this.getUserById(id);
    },

    async addUserEnroll(userId, eventInfo) {
        const userCollection = await users(); 
        let newEventInfo = {};
        //For now it will only pass id, title, date time for enroll_ev
        newEventInfo.eventId = eventInfo.eventId;
        newEventInfo.title = eventInfo.title;
        newEventInfo.date = eventInfo.date;
        newEventInfo.time = eventInfo.time;
        await userCollection.updateOne({_id: userId}, {
            $push: {
                enroll_ev: newEventInfo
            }
        });
        return await this.getUserById(userId);
    },

    async removeUserEnroll(userId, eventId) {
        const userCollection = await users(); 
        let updateCommand = await userCollection.updateOne({_id: userId}, {
            $pull: {
                enroll_ev: {
                    eventId: eventId
                }
            }
        });
        return await this.getUserById(userId);
    },

    //!!!!!! Missing Add friends and remove friends
    async addUserFriend(userId, friendInfo) {
        const userCollection = await users(); 
        let newFriendInfo = {};
        // //For now it will only pass id, title, date time for enroll_ev
        newFriendInfo.friendId = friendInfo.friendId;
        let checkExist = await this.getUserById(friendInfo.friendId);
        if (checkExist === null || undefined) {
            throw "friendID DOES NOT EXIST";
        }
        // newFriendInfo.title = eventInfo.title;
        // newFriendInfo.date = eventInfo.date;
        await userCollection.updateOne({_id: userId}, {
            $push: {
               friends: newFriendInfo
            }
        });
        return await this.getUserById(userId);
    },

    async removeUserFriend(userId, friendId) {
        const userCollection = await users(); 
        let updateCommand = await userCollection.updateOne({_id: userId}, {
            $pull: {
                friends: {
                    friendId: friendId
                }
            }
        });
        return await this.getUserById(userId);
    }
};

module.exports = exportedMethods;