const express = require("express");
const MessagesService = require("./messages_service");

const messagesRouter = express.Router();
const jsonParser = express.json();

messagesRouter
    .route("/messages")
    .get((req, res, next) => {
        MessagesService.getAllMessages(req.app.get("db")).then((messages) => {
            res.json(messages);
        });
    })
    .post(jsonParser, (req, res, next) => {
        const { message_copy, player_id } = req.query;
        const newMessage = { message_copy, player_id };

        MessagesService.addMessage(req.app.get("db"), newMessage).then(
            (message) => {
                res.status(201).json("Message posted");
            }
        );
    });

module.exports = messagesRouter;
