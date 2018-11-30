const eventRoutes = require("./events");
const userRoutes = require("./users");

const constructorMethod = app => {
    app.use("/api/events", eventRoutes);
    app.use("/api/users", userRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
