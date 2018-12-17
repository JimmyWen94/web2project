const eventRoutes = require("./events");
const userRoutes = require("./users");

const fs = require('fs');

const constructorMethod = app => {
    app.use("/api/events", eventRoutes);
    app.use("/api/users", userRoutes);

    app.get('/getReadme', async (req, res) => {
        const text = await fs.readFile('../Oct30.md', 'utf-8');
        res.json(JSON.stringify({text}));
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
