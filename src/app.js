require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const winston = require("winston");
const cardsRouter = require("./cards/cards_router");
const app = express();
const messagesRouter = require("./messages/messages_router");
const playersRouter = require("./players/players_router");
const gameRouter = require("./game/ game_router");

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: "info.log" })],
});

if (NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use("/", cardsRouter);
app.use("/", messagesRouter);
app.use("/", playersRouter);
app.use("/", gameRouter);

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === "production") {
        response = { error: { message: "server error" } };
    } else {
        console.error(error);
        response = { message: error.message, error };
    }
    res.status(500).json(response);
});

module.exports = app;
