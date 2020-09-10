require("dotenv").config();

const app = require("./app");
const { PORT, DB_URL } = require("./config");
const knex = require("knex");
const socket = require("socket.io");

const db = knex({
    client: "pg",
    connection: DB_URL,
});

app.set("db", db);

const server = app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

const io = socket(server);

io.on("connection", function (socket) {
    console.log("made socket connection");
});
